export default class ChargeAfterApi {

    constructor(axios){
        this.axios = axios
    }

    process(uuid, data){
        return this.axios.post(`carts/${uuid}/payment/chargeafter/process`, data)
    }

}
