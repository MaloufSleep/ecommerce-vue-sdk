export default class CheckoutApi {

    constructor(axios){
        this.axios = axios
    }

    /**
     * Send mattress recycle email
     * @param {object} uuid - customer contact information
     */
    sendRecycleEmail(customer){
        return this.axios.post(`compliance/emails/recycle/send`, {
            customer
        })
    }

    /**
     * Set the shipping address for the cart
     * @param {string} uuid - cart uuid
     * @param {object} address - shipping address
     * @param {boolean} subscribe - newsletter subscription boolean
     * @param {boolean} subscribeSms - sms subscription boolean
     */
    setShippingAddress(uuid, address, subscribe, subscribeSms, signUpSourceId){
        return this.axios.post(`carts/${uuid}/shipping/address`, {
            address,
            subscribe,
            subscribe_sms: subscribeSms,
            source_id: signUpSourceId
        })
    }

    /**
     * Set the shipping service for the cart
     * @param {string} uuid - cart uuid
     * @param {int} id - shipping service ID
     */
    setShippingService(uuid, id){
        return this.axios.post(`carts/${uuid}/shipping/services/${id}`)
    }

}