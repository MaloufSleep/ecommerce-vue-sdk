import { Resource } from './resource'

export class Cart extends Resource {

    /**
     * Get the cart 
     * @param {string} uuid - cart uuid
     */
    get(uuid){
        return this.axios.get(`${this.basePath}/${uuid}`)
    }

    /**
     * Clear the cart
     * @param {string} uuid - cart uuid
     */
    clear(uuid){
        return this.axios.delete(`${this.basePath}/${uuid}/items`)
    }

    /**
     * Add an item to the cart
     * @param {string} uuid - cart uuid
     * @param {object[]} items - items to be added
     */
    addItems(uuid, items){
        return this.axios.post(`${this.basePath}/${uuid || ''}`, {items})
    }

    /**
     * Update an item in the cart
     * @param {string} uuid - cart uuid
     * @param {int} id - item id
     * @param {object} updates
     */
    updateItem(uuid, id, updates){
        return this.axios.put(`${this.basePath}/${uuid}/items/${id}/update`, updates)
    }

    /**
     * Remove an item from the cart
     * @param {string} uuid - cart uuid
     * @param {int[]} ids - item ids
     */
    removeItems(uuid, ids){
        return this.axios.post(`${this.basePath}/${uuid}/items/remove`, {items: ids})
    }

    /**
     * Set the shipping address for the cart
     * @param {string} uuid - cart uuid
     * @param {object} address - shipping address
     */
    setShippingAddress(uuid, address){
        return this.axios.post(`${this.basePath}/${uuid}/shipping/address`, address)
    }

    /**
     * Set the shipping service for the cart
     * @param {string} uuid - cart uuid
     * @param {int} id - shipping service ID
     */
    setShippingService(uuid, id){
        return this.axios.post(`${this.basePath}/${uuid}/shipping/services/${id}`)
    }
}
