import axios from 'axios'
import { Cart } from './cart'
import { Payment } from './payment'

export default class APIClient {

    /**
     * Constructs a new APIClient object
     * @param {object} config - configuration object
     */
    constructor(endpoint, region_id){
        // create axios instance with base url and store token from config
        const axiosInstance = axios.create({
            baseURL: `${endpoint}/api-v2/ecommerce`,
            headers: {
                'X-Site-Region': region_id,
                'Content-Type': 'application/json',
                accept: 'application/json',
            }
        })

        // create each of the resources
        this.cart = new Cart(axiosInstance)
        this.payment = new Payment(axiosInstance)
    }

}
