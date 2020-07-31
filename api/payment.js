export class Payment {
    constructor(axios){
        this.card = new Card(axios)
        this.synchrony = new Synchrony(axios)
        this.applePay = new ApplePay(axios)
    }
}


class Card {
    constructor(axios){
        this.axios = axios
    }

    /**
     * Submit a card payment with a nonce
     * @param {string} uuid - cart uuid
     * @param {object} address - billing address
     */
    nonce(uuid, nonce, address){
        return this.axios.post(`carts/${uuid}/payment/card/nonce`, {
            nonce,
            address
        })
    }
}

class Synchrony {
    constructor(axios){
        this.axios = axios
    }

    /**
     * Retreives an token from the auth endpoint
     * @param {string} uuid - cart uuid
     */
    authenticate(uuid){
        return this.axios.get(`carts/${uuid}/payment/synchrony/auth`)
    }

    /**
     * Retreives the status of a transaction
     * @param {string} uuid - cart uuid
     * @param {string} token - synchrony transaction token
     */
    status(uuid, token){
        return this.axios.get(`carts/${uuid}/payment/synchrony/status/${token}`)
    }

    /**
     * Process the transaction
     * @param {string} uuid - cart uuid
     * @param {string} token - synchrony transaction token
     */
    process(uuid, token){
        return this.axios.post(`carts/${uuid}/payment/synchrony/process`, {
            token
        })
    }
}

class ApplePay {
    constructor(axios){
        this.axios = axios
    }
}