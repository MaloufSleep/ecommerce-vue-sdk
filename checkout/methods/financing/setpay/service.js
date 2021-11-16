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
        
        return params
        // .then(res => {
        //     return params
        // }).catch(error => {
        //     console.log(`Load Script Error: ${error}`)
        //     return null
        // })
    }

    handleResponse(){
        return new Promise((resolve, reject) => {
            function handler(event){
                if(typeof event.data === 'string' && (event.data === 'Close Model' || event.data == 'Return To Partner Shipping')){
                    window.removeEventListener('message', handler)
                    resolve(true)
                }
            }
            window.addEventListener('message', handler)
        })
    }

}