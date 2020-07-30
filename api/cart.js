export class Cart {

    constructor(axios){
        this.axios = axios
    }

    /**
     * Get the cart 
     * @param {string} uuid - cart uuid
     */
    get(uuid){
        return this.axios.get(`carts/${uuid}`)
    }

    /**
     * Clear the cart
     * @param {string} uuid - cart uuid
     */
    clear(uuid){
        return this.axios.delete(`carts/${uuid}/items`)
    }

    /**
     * Add an item to the cart
     * @param {string} uuid - cart uuid
     * @param {object[]} items - items to be added
     */
    addItems(uuid, items){
        return this.axios.post(`carts/${uuid || ''}`, {items})
    }

    /**
     * Update an item in the cart
     * @param {string} uuid - cart uuid
     * @param {int} id - item id
     * @param {object} updates
     */
    updateItem(uuid, id, updates){
        return this.axios.put(`carts/${uuid}/items/${id}/update`, updates)
    }

    /**
     * Remove an item from the cart
     * @param {string} uuid - cart uuid
     * @param {int[]} ids - item ids
     */
    removeItems(uuid, ids){
        return this.axios.post(`carts/${uuid}/items/remove`, {items: ids})
    }

    /**
     * Set the shipping address for the cart
     * @param {string} uuid - cart uuid
     * @param {object} address - shipping address
     */
    setShippingAddress(uuid, address){
        return this.axios.post(`carts/${uuid}/shipping/address`, address)
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
