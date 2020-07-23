import axios from 'axios'
import { Cart } from './cart'

export default class APIClient {

    /**
     * Constructs a new APIClient object
     * @param {object} config - configuration object
     */
    constructor(endpoint, region_id){
        // create axios instance with base url and store token from config
        const axiosInstance = axios.create({
            baseURL: endpoint,
            headers: {
                'X-Site-Region': region_id,
                'Content-Type': 'application/json',
                accept: 'application/json',
            }
        })

        axiosInstance.interceptors.response.use(function(response){ 
            return response
        }, function(error){
            return Promise.reject(error.response)
        })

        // base path
        this.basePath = 'api-v2/ecommerce'

        // create each of the resources
        this.cart = new Cart(axiosInstance, `${this.basePath}/carts`)
    }

}
