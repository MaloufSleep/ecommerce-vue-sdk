export default class SetPayService {

    constructor(repository, setpay){
        this.repository = repository
        this.setpay = setpay

        this._setLoad = null
    }

    /**
     * Starts an Apple Pay payment session
     * @param {string} transId Transaction Id
     * @param {function} onLoad Callback when the script loads to set load display 
     * */
    launchWidget(setLoad) {
        const setpayConfig = this.repository.getSetpayConfig();
        this._setLoad = setLoad

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
            this._setLoad(true);
            console.log('HandleResponse Res', res);
            // return this.repository.getStatus(accessToken, params.clientTransId)
        }).then(res => {
            console.log('GetStatus Res', res);
            // return this.repository.process(params.clientTransId)
        }).catch(err => {
            console.log("ERROR: ", err);
            this._setLoad();
            throw new Error();
        })
    }

    loadForm(params) {
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
                    console.log('SYNCHRONY MODAL CLOSED', event.data)
                    window.removeEventListener('message', handler)
                    resolve(true)
                }
            }
            console.log('SYNCHRONY MODAL OPENED')
            window.addEventListener('message', handler)
        })
    }
}