export default class CartAPI {

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
     * @param {object|null} customer - partial customer data to associate cart with
     */
    addItems(uuid, items, customer = null){
        return this.axios.post(`carts/${uuid || ''}`, {
            items,
            customer
        })
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
     * Applies a promotion to the cart
     * @param {string} uuid - cart uuid
     * @param {string} code - code string
     */
    applyPromotion(uuid, code){
        return this.axios.post(`carts/${uuid}/promotions/apply`, {code})
    }

    /**
     * Removes a promotion from the cart
     * @param {string} uuid - cart uuid
     * @param {int} promotion_id - promotion id
     */
    removePromotion(uuid, promotion_id){
        return this.axios.post(`carts/${uuid}/promotions/remove`, {promotion_id})
    }

}