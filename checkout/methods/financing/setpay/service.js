export default class SetPayService {

    constructor(repository, setpay){
        this.repository = repository
        this.setpay = setpay
    }

    getFormData(transId) {
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

        this.setpay.loadScript(amount.toUnit())
        this.handleResponse(); //.then (call the status api inquiry using the transId data variable)

        return params
    }

    handleResponse(){
        return new Promise((resolve, reject) => {
            function handler(event){
                if(typeof event.data === 'string' && (event.data === 'Close Model' || event.data == 'Return To Partner Shipping')){
                    console.log("********************************EVENT LISTENER REMOVE*************************************")
                    window.removeEventListener('message', handler)
                    resolve(true)
                }
            }
            console.log("********************************EVENT LISTENER ADDED*************************************")
            window.addEventListener('message', handler)
        })
    }

}