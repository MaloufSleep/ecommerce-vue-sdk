import { CartService } from './cart'
import { GooglePayService } from './integrations/googlePay'
import { PaypalService } from './integrations/paypal'
import { AuthorizeNetService } from './integrations/authorizeNet'

export class Services {

    constructor(api, store, options){
        this.cart = new CartService(api, store)

        if(options.googlePay){
            this.googlePay = new GooglePayService(api, store, options.googlePay)
        }

        if(options.paypal){
            this.paypal = new PaypalService(api, store, options.paypal)
        }

        if(options.authorizeNet){
            this.authorizeNet = new AuthorizeNetService(api, store, options.authorizeNet)
        }
    }

}