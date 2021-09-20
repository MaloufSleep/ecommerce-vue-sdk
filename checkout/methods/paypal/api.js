export default class PayPalApi {

    constructor(axios){
        this.axios = axios
    }

    verify(uuid, url){
        console.log('VERIFY api.js')
        return this.axios.post(`carts/${uuid}/payment/paypal/verify`, {url}).then(res => {
            console.log(res.data)
            return res.data
        }).catch(err => {
            if(err.response?.data) throw err.response.data
            throw err
        })
    }

    shipping(uuid, address){
        return this.axios.post(`carts/${uuid}/payment/paypal/shipping`, address).then(res => {
            return res.data
        }).catch(err => {
            if(err.response?.data) throw err.response.data
            throw err
        })
    }

    process(uuid, token, billingContact, shippingContact){
        return this.axios.post(`carts/${uuid}/payment/paypal/process`, {
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