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

    getStatus(uuid, merchantNumber){
        return this.axios.get(`carts/${uuid}/payment/setpay/status/${merchantNumber}`)
    }

    process(uuid){
        return this.axios.post(`carts/${uuid}/payment/setpay/process`)
    }

}