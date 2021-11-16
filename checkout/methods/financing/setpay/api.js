export default class SetPayApi {

    constructor(axios){
        this.axios = axios
    }

    authenticate(uuid){
        return this.axios.get(`carts/${uuid}/payment/setpay/auth`)
    }

    getFormData(uuid){
        return this.axios.get(`carts/${uuid}/payment/setpay/getFormData`)
    }

    getStatus(uuid, token){
        return this.axios.get(`carts/${uuid}/payment/setpay/status/${token}`)
    }

    process(uuid, token){
        return this.axios.post(`carts/${uuid}/payment/setpay/process`, {
            token
        })
    }

}