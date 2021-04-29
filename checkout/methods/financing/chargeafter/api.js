export default class ChargeAfterApi {

    constructor(axios){
        this.axios = axios
    }

    updateShipping(uuid, data){
        return this.axios.post(`carts/${uuid}/payment/chargeafter/shipping`, data)
    }

    process(uuid, data){
        return this.axios.post(`carts/${uuid}/payment/chargeafter/process`, data)
    }

}
