import axios from 'axios'
import { Products } from './products'
import { Cart } from './cart'

export class APIClient {
    /*
        Constructor
        Accepts a config object used to setup axios
    */
    constructor(config){
        // create axios instance with base url and store token from config
        const axiosInstance = axios.create({
            baseURL: config.endpoint,
            headers: {
                'X-Site-Reference': config.reference,
                'X-Site-Locale': config.locale,
                'Content-Type': 'application/json',
                accept: 'application/json',
            }
        })

        // base path
        this.basePath = 'api-v2/ecommerce'

        // create each of the resources
        this.products = new Products(axiosInstance, `${this.basePath}/products`)
        this.cart = new Cart(axiosInstance, `${this.basePath}/cart`)
    }

}