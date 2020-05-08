import { CartService } from './cart'
import { GooglePayService } from './integrations/googlePay'

export class Services {

    constructor(api, options){
        this.cart = new CartService(api, options.store)
        this.googlePay = new GooglePayService(api, options.store, options.googlePay)
    }

}