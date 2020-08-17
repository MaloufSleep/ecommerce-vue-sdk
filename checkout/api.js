export default class CheckoutApi {

    constructor(axios){
        this.axios = axios
    }

    /**
     * Set the shipping address for the cart
     * @param {string} uuid - cart uuid
     * @param {object} address - shipping address
     */
    setShippingAddress(uuid, address, subscribe){
        return this.axios.post(`carts/${uuid}/shipping/address`, {
            address,
            subscribe
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