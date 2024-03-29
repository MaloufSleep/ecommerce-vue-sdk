const axios = require("axios");
export default class SetPayService {

    constructor(repository, setpay){
        this.repository = repository
        this.setpay = setpay

        this._setLoad = null
        this._setTransProgress = null
        this._onSuccess = null
    }

    /**
     * Starts an Apple Pay payment session
     * @param {string} transId Transaction Id
     * @param {function} onLoad Callback when the script loads to set load display 
     * */
    launchWidget(setLoad, setTransProgress, onSuccess) {
        const setpayConfig = this.repository.getSetpayConfig();
        this._setLoad = setLoad
        this._setTransProgress = setTransProgress
        this._onSuccess = onSuccess
        
        this._setLoad(true)

        const amount = this.repository.getCartTotal()
        const shippingAddress = this.repository.getShippingAddress()
        if(!amount) return Promise.reject('Cart total amount not defined')
        if(!shippingAddress) return Promise.reject('Shippping address not defined')

        const params = {
            partnerID: setpayConfig.partnerId,
            merchantID: setpayConfig.merchantId,
            purchAmount: amount.toUnit(),
            custFirstName: shippingAddress.first_name || '',
            custLastName: shippingAddress.last_name || '',
            custAddress1: shippingAddress.street_1 || '',
            custAddress2: shippingAddress.street_2 || '',
            phoneNumber: shippingAddress.phone || '',
            emailAddress: shippingAddress.email || '',
            custCity: shippingAddress.locality || '',
            custState: shippingAddress.region || '',
            custZipCode: shippingAddress.postcode || ''
        }

        let accessToken = '';

        return this.repository.authenticate().then(res => {
            accessToken = res.data.accessToken
            params.clientTransId = res.data.clientTransId
            return this.setpay.loadScript(amount.toUnit())
        }).then(res => {
            this._setLoad();
            this.loadForm(params);
            return this.handleResponse()
        }).then(res => {
            this._setTransProgress("Checking order status... Please do not refresh the page");
            return this.repository.getStatus(this.setpay.merchantId)
        }).then(res => {
            // Check if application was accepted or declined
            if(res.data.account_number) {
                this._setTransProgress("Transaction in progress... Please do not refresh the page");
                return this.repository.process(this.setpay.merchantId)
            } else if (res.data.response_code == 404) {
                window.location.reload()
            } else {
                this._setTransProgress("Transaction failed... Page will refresh in 3 seconds.");
                return null
            }            
        }).then(res => {
            if(res) {
                this._onSuccess()
                return res
            } else {
                setTimeout(() => {
                    window.location.reload()
                    return null
                }, 3000)
            }
        }).catch(err => {
            console.log("ERROR: ", err);
            throw new Error();
        })
    }

    loadForm(params) {
        // Remove pre-exisiting form if exists
        let prevForm = document.getElementById("setpay-form")
        if(prevForm) prevForm.parentNode.removeChild(prevForm)

        let form = document.createElement("form")
        form.setAttribute("id", "setpay-form")
        let formParams = {}

        for(const [key, val] of Object.entries(params)) {
            formParams[key] = document.createElement("input")
            formParams[key].setAttribute("type", "hidden")
            formParams[key].setAttribute("name", key)
            formParams[key].setAttribute("value", val)
            form.append(formParams[key])
        }

        document.getElementById("setpay-pay-div").appendChild(form);
    }

    handleResponse(){
        return new Promise((resolve, reject) => {
            function handler(event){
                if(typeof event.data.event == 'string' && (event.data.event === 'close-modal' || event.data.event === 'back-to-partner')) {
                    window.removeEventListener('message', handler)
                    resolve(true)
                }
            }
            window.addEventListener('message', handler)
        })
    }
}