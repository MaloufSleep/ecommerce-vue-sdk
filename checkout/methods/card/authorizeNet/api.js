export default class CardApi {

    constructor(axios){
        this.axios = axios
    }

    nonce(uuid, nonce, address){
        return this.axios.post(`carts/${uuid}/payment/card/nonce`, {
            nonce,
            address
        })
    }

}