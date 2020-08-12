export default class CheckoutRepository {

    constructor(store, api){
        this.store = store
        this.api = api
        this.loading = false
    }

    setCart(cart){
        this.store.commit('cart/set', cart)
        return cart
    }

    setShippingAddress(address){
        if(this.loading) return Promise.reject('Another request is in progress')

        this.loading = true
        return this.api.setShippingAddress(this.store.state.cart.cart.uuid, address).then(res => {
            return this.setCart(res.data.data)
        }).finally(() => this.loading = false)
    }

    setShippingService(id){
        if(this.loading) return Promise.reject('Another request is in progress')

        this.loading = true
        return this.api.setShippingService(this.store.state.cart.cart.uuid, id).then(res => {
            return this.setCart(res.data.data)
        }).finally(() => this.loading = false)
    }

    getOrder(){
        return this.store.state.checkout.order
    }

    getShippingServices(){
        return this.store.state.site.region.shipping_services
    }

    getPaymentServices(){
        return this.store.state.site.region.payment_services
    }

}