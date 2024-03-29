import Dinero from 'dinero.js'

export default class SynchronyRepository {

    constructor(store, api, cartRepository, checkoutRepository){
        this.store = store
        this.api = api
        this.cartRepository = cartRepository
        this.checkoutRepository = checkoutRepository
    }

    getCartTotal(){
        const cart = this.cartRepository.get()
        return new Dinero({amount: cart?.totals?.total})
    }

    getShippingAddress(){
        const cart = this.cartRepository.get()
        return cart?.shipping_address
    }

    authenticate(){
        const cart = this.cartRepository.get()
        return this.api.authenticate(cart?.uuid).then(res => {
            if(res.data?.cart) this.cartRepository.set(res.data.cart)
            return res
        })
    }

    getStatus(token){
        const cart = this.cartRepository.get()
        return this.api.getStatus(cart?.uuid, token)
    }

    process(token){
        const cart = this.cartRepository.get()
        return this.api.process(cart?.uuid, token).then(res => {
            this.cartRepository.set(res.data.cart)
            this.checkoutRepository.setOrder(res.data.order)
            return res
        })
    }
}
