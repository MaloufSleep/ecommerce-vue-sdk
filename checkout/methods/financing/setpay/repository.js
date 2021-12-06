import Dinero from 'dinero.js'

export default class SetPayRepository {

    constructor(store, api, cartRepository, checkoutRepository, setpayConfig){
        this.store = store
        this.api = api
        this.cartRepository = cartRepository
        this.checkoutRepository = checkoutRepository
        this.setpayConfig = setpayConfig
    }

    getSetpayConfig() {
        return this.setpayConfig;
    }

    authenticate(){
        const cart = this.cartRepository.get()
        return this.api.authenticate(cart?.uuid).then(res => {
            if(res.data?.cart) this.cartRepository.set(res.data.cart)
            console.log(res);
            return res
        })
    }

    getCartTotal(){
        const cart = this.cartRepository.get()
        return new Dinero({amount: cart?.totals?.total})
    }

    getShippingAddress(){
        const cart = this.cartRepository.get()
        return cart?.shipping_address
    }

    getStatus(merchantNumber){
        const cart = this.cartRepository.get()
        return this.api.getStatus(cart?.uuid, merchantNumber)
    }

    process(){
        const cart = this.cartRepository.get()
        return this.api.process(cart?.uuid).then(res => {
            this.cartRepository.set(res.data.cart)
            this.checkoutRepository.setOrder(res.data.order)
            return res
        })
    }
}
