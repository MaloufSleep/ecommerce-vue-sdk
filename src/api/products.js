import { Resource } from './resource'

export class Products extends Resource {

    /**
     * @param {*} options
     */
    setOptions(options){
        this.options = options
    }

    /**
     * Get products for a list of product IDs
     * @param {int[]} ids
     * @param {*=} options 
     */
    forIds(ids, options = null){
        let params = options ? options : this.options ? this.options : {}
        params.products = ids;
        return this.axios.post('api2/ecommerce/products/forIds', params)
    }


    /**
     * Get products for a product list
     * @param {int=} list
     * @param {*=} options 
     */
    forList(list = null, options = null){
        let params = options ? options : this.options ? this.options : {}
        if(list != null) params.list_id = list;
        return this.axios.post('api2/ecommerce/products/forList', params)
    }


    /**
     * Get adjusted inventory for a specific product
     * @param {int} id 
     */
    adjustedInventory(id){
        return this.axios.get('api2/ecommerce/products/inventory', id)
    }
}