import CartAPI from './api/cartApi'
import CartRepository from './repositories/cartRepository'
import CartService from './services/cartService'

// module factory
export default function(context){
    
    // construct cart objects
    const cartApi = new CartAPI(context.api)
    const cartRepository = new CartRepository(context.store, cartApi)
    const cartService = new CartService(cartRepository)

    return cartService
}