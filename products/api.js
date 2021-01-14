export default class ProductsAPI {

    constructor(axios){
        this.axios = axios
    }

    /**
     * Get products by IDs 
     * @param {array} product_ids 
     */
    getByIds(product_ids){
        return this.axios.post('products', { product_ids })
    }

    /**
     * Get the product by slug
     * @param {string} slug - product slug
     */
    getBySlug(slug){
        return this.axios.get(`products/slug/${slug}`)
    }

}