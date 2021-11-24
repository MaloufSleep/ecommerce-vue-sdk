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
    launchWidget(transId, setLoad) {
        this._setLoad = setLoad

        const amount = this.repository.getCartTotal()
        const shippingAddress = this.repository.getShippingAddress()
        if(!amount) return Promise.reject('Cart total amount not defined')
        if(!shippingAddress) return Promise.reject('Shippping address not defined')

        const params = {
            partnerID: this.setpay.partnerId,
            merchantID: this.setpay.merchantId,
            clientTransId: transId,
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

        return this.setpay.loadScript(amount.toUnit()).then(res => {
            this._setLoad();
        }).then(() => {
            this.loadForm(params);
            this.handleResponse()
        }).then(res => {
            console.log('handleResponse', res);
            // return this.repository.getStatus(params.transId)
        }).then(res => {
            // return this.repository.process(params.transId)
        }).catch(err => {   
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
                if(typeof event.data.event == 'string' && (event.data.event == 'Close Model' || event.data.event == 'Return To Partner Shipping')) {
                    console.log('SYNCHRONY MODAL CLOSED', event)
                    window.removeEventListener('message', handler)
                    resolve(true)
                }
            }
            console.log('SYNCHRONY MODAL OPENED')
            window.addEventListener('message', handler)
        })
    }
}