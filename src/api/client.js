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
                'X-Store-Public-Key': config.token
            }
        })

        // create each of the resources
        this.products = new Products(axiosInstance, 'api2/ecommerce/products/')
        this.cart = new Cart(axiosInstance, 'api2/ecommerce/cart/')
    }

}