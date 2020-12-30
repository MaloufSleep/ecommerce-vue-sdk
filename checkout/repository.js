export default class CheckoutRepository {

    constructor(store, api, siteRepository, cartRepository){
        this.store = store
        this.api = api
        this.siteRepository = siteRepository
        this.cartRepository = cartRepository
        this.loading = false
    }

    /**
     * Set the shipping address for the cart
     * @param {object} address address object to pass to api
     * @param {bool} subscribe newsletter subscription boolean
     * @param {bool} subscribeSms sms subscription boolean
     */
    setShippingAddress(address, subscribe, subscribeSms, requestMattressRemoval){
        if(this.loading) return Promise.reject('Another request is in progress')

        this.loading = true
        return this.api.setShippingAddress(this.store.state.cart.cart.uuid, address, subscribe, subscribeSms, requestMattressRemoval).then(res => {
            return this.cartRepository.set(res.data)
        }).finally(() => this.loading = false)
    }

    /**
     * Set the shipping service for the cart
     * @param {int} id ID of the shipping service
     */
    setShippingService(id){
        if(this.loading) return Promise.reject('Another request is in progress')

        this.loading = true
        return this.api.setShippingService(this.store.state.cart.cart.uuid, id).then(res => {
            return this.cartRepository.set(res.data)
        }).finally(() => this.loading = false)
    }

    getOrder(){
        return this.store.state.checkout.order
    }

    setOrder(order){
        this.store.commit('checkout/setOrder', order)
    }

    getShippingServices(){
        const region = this.siteRepository.getRegion()
        return region?.shipping_services
    }

    getPaymentServices(){
        const region = this.siteRepository.getRegion()
        return region?.payment_services
    }

}