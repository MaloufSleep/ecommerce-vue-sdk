export default class SynchronyApi {

    constructor(axios){
        this.axios = axios
    }

    authenticate(uuid){
        return this.axios.get(`carts/${uuid}/payment/synchrony/auth`)
    }

    getStatus(uuid, token){
        return this.axios.get(`carts/${uuid}/payment/synchrony/status/${token}`)
    }

    process(uuid, token){
        return this.axios.post(`carts/${uuid}/payment/synchrony/process`, {
            token
        })
    }

}