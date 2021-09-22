export default class PayPalApi {

    constructor(axios){
        this.axios = axios
    }

    shipping(uuid, address){
        return this.axios.post(`carts/${uuid}/payment/paypal/shipping`, address).then(res => {
            return res.data
        }).catch(err => {
            if(err.response?.data) throw err.response.data
            throw err
        })
    }

    // createOrder(uuid){
    //     return this.axios.post(`carts/${uuid}/payment/paypal/createOrder`, {
    //     }).then(res => {
    //         return res.data
    //     }).catch(err => {
    //         if(err.response?.data) throw err.response.data
    //         throw err
    //     })
    // }

    process(uuid, authorizationId){
        return this.axios.post(`carts/${uuid}/payment/paypal/process`,
            { 
                authorization_id: authorizationId 
            }
        ).then(res => {
            return res.data
        }).catch(err => {
            if(err.response?.data) throw err.response.data
            throw err
        })
    }

}