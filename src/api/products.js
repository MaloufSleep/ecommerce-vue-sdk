import { Resource } from './resource'

export class Products extends Resource {

    /**
     * Get products for a list of product IDs
     * @param {int[]} ids
     * @param {object=} options 
     */
    forIds(ids, options = null){
        let params = options || {}
        params.products = ids;
        return this.axios.post(this.basePath + 'forIds', params)
    }


    /**
     * Get products for a product list
     * @param {int=} list
     * @param {object=} options 
     */
    forList(list = null, options = null){
        let params = options || {}
        if(list != null) params.list_id = list;
        return this.axios.post(this.basePath + 'forList', params)
    }


    /**
     * Get adjusted inventory for a specific product
     * @param {int} id 
     */
    adjustedInventory(id){
        return this.axios.get(this.basePath + 'inventory', id)
    }
}