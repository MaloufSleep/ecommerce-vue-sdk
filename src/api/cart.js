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
        return this.axios.post(`${this.basePath}/${uuid}/clear`)
    }

    /**
     * Add an item to the cart
     * @param {string} uuid - cart uuid
     * @param {object} item - item to be added
     */
    addItem(uuid, item){
        return this.axios.post(`${this.basePath}/${uuid ? uuid : ''}`, item)
    }

    /**
     * Update an item in the cart
     * @param {string} uuid - cart uuid
     * @param {int} id - item id
     * @param {object} updates
     */
    updateItem(uuid, id, updates){
        return this.axios.put(`${this.basePath}/${uuid}/item/${id}/update`, updates)
    }

    /**
     * Remove an item from the cart
     * @param {string} uuid - cart uuid
     * @param {int} id - item id
     */
    removeItem(uuid, id){
        return this.axios.delete(`${this.basePath}/${uuid}/item/${id}/remove`)
    }
}
