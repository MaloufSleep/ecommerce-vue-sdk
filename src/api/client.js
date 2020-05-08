import axios from 'axios'
import { Products } from './products'


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
                'X-Store-Token': config.token
            }
        })
        this.axios = axiosInstance

        // create each of the resources
        this.products = new Products(this.axios)
    }

}