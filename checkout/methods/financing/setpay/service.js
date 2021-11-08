export default class SetPayService {

    constructor(repository, setpay){
        this.repository = repository
        this.setpay = setpay
    }

    launchCombinedModal(promotion){
        const amount = this.repository.getCartTotal()
        const shippingAddress = this.repository.getShippingAddress()
        if(!amount) return Promise.reject('Cart total amount not defined')
        if(!shippingAddress) return Promise.reject('Shippping address not defined')

        const params = {
            custFirstName: shippingAddress.first_name,
            custLastName: shippingAddress.last_name,
            custZipCode: shippingAddress.postcode,
            iniPurAmt: Math.ceil((amount.getAmount()/100)/500) * 500,
            custAddress1: shippingAddress.street_1,
            custAddress2: shippingAddress.street_2,
            phoneNumber: shippingAddress.phone,
            emailAddress: shippingAddress.email,
            custCity: shippingAddress.locality,
            custState: shippingAddress.region,
            transPromo1: promotion,
            transAmount1: amount.toUnit()
        }

        return this.repository.authenticate().then(res => {
            params.tokenId = res.data.clientToken
            params.clientTransId = res.data.clientTransId
            return this.setpay.launchModal(params, 3)
        }).then(res => {
            return this.handleResponse()
        }).then(res => {
            return this.repository.getStatus(params.tokenId)
        }).then(res => {
            return this.repository.process(params.tokenId)
        })
    }

    handleResponse(){
        return new Promise((resolve, reject) => {
            function handler(event){
                if(typeof event.data === 'string' && (event.data === 'Close Model' || event.data == 'Return To Merchant Shipping')){
                    window.removeEventListener('message', handler)
                    resolve(true)
                }
            }
            window.addEventListener('message', handler)
        })
    }

}