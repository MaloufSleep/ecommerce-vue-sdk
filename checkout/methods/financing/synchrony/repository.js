import Dinero from 'dinero.js'

export default class SynchronyRepository {

    constructor(store, api){
        this.store = store
        this.api = api
    }

    getCartTotal(){
        return new Dinero({amount: this.store.state.cart.cart?.totals?.total})
    }

    getShippingAddress(){
        return this.store.state.cart.cart?.shipping_address
    }

    authenticate(){
        return this.api.authenticate(this.store.state.cart.cart?.uuid)
    }

    getStatus(token){
        return this.api.getStatus(this.store.state.cart.cart?.uuid, token)
    }

    process(token){
        return this.api.process(this.store.state.cart.cart?.uuid, token).then(res => {
            this.store.commit('cart/set', res.data.cart)
            this.store.commit('checkout/setOrder', res.data.order)
            return res
        })
    }
}
