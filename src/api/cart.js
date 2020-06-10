import { Resource } from './resource'

export class Cart extends Resource {

    /**
     * Get the cart 
     * @param {string} reference
     */
    get(reference){
        return this.axios.get(this.basePath, {
            params: {
                reference
            }
        })
    }

    /**
     * Clear the cart
     * @param {string} reference
     */
    clear(reference){
        return this.axios.get(this.basePath + 'clear/', {
            params: {
                reference
            }
        })
    }

    /**
     * Add an item to the cart
     * @param {string} reference
     * @param {object} item
     */
    addItem(reference, item){
        let params = { item }
        if(reference) params.reference = reference
        return this.axios.post(this.basePath + 'item/add/', params)
    }

    /**
     * Update an item in the cart
     * @param {string} reference
     * @param {object} item
     */
    updateItem(reference, id, updates){
        return this.axios.post(this.basePath + 'item/update/', {
            reference,
            item: Object.assign({ id }, updates)
        })
    }

    /**
     * Remove an item from the cart
     * @param {string} reference
     * @param {int} product_id
     * @param {int=} type_id
     */
    removeItem(reference, id){
        return this.axios.post(this.basePath + 'item/remove/', {
            reference,
            item: {
                id
            }
        })
    }
}
