export default class ApplePayApi {

    constructor(axios){
        this.axios = axios
    }

    verify(uuid, url){
        return this.axios.post(`carts/${uuid}/payment/apple-pay/verify`, {url}).then(res => {
            return res.data
        }).catch(err => {
            throw err.response.data
        })
    }

    shipping(uuid, address){
        return this.axios.post(`carts/${uuid}/payment/apple-pay/shipping`, address).then(res => {
            return res.data
        }).catch(err => {
            throw err.response.data
        })
    }

    process(uuid, token, billingContact, shippingContact){
        return this.axios.post(`carts/${uuid}/payment/apple-pay/process`, {
            token,
            billingContact,
            shippingContact
        }).then(res => {
            return res.data
        }).catch(err => {
            if(err.response?.data) throw err.response.data
            throw err
        })
    }

}