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
    getFormData(transId, setLoad) {
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
            console.log("PROMISE STEP ONE")
            return params
        }).then((res) => {
            console.log("PROMISE STEP TWO", res)
            return this.handleResponse();
        }).then(data => {
            console.log("PROMISE STEP THREE", data)
        }).catch(err => {   
            this._setLoad();
            throw new Error();
        })
    }

    handleResponse(){
        return new Promise((resolve, reject) => {
            function handler(event){
                if(typeof event.data === 'string' && (event.data === 'Close Model' || event.data == 'Return To Merchant Shipping')){
                    console.log('SYNCHRONY MODAL CLOSED', event)
                    window.removeEventListener('message', handler)
                    resolve(true)
                }
            }
            console.log("SYNCHRONY MODAL EVENT LISTENER ADDED")
            window.addEventListener('message', handler)
        })
    }
}