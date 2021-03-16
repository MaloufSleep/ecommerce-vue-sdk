export default class ProductsAPI {

    constructor(axios){
        this.axios = axios
    }

    /**
     * Get products by IDs 
     * @param {array} product_ids
     * @param {object} options
     */
    getByIds(product_ids, options = {}){
        return this.axios.post('products', {product_ids, ...options})
    }

    /**
     * Get the product by slug
     * @param {string} slug - product slug
     * @param {object} options
     */
    getBySlug(slug, options = {}){
        return this.axios.post(`products/slug/${slug}`, {...options})
    }

}