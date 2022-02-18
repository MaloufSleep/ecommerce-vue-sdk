export default class CheckoutRepository {

    constructor(store, api, siteRepository, cartRepository){
        this.store = store
        this.api = api
        this.siteRepository = siteRepository
        this.cartRepository = cartRepository
        this.loading = false
    }

    /**
     * Send mattress recycle email
     * @param {object} email customer contact information 
     */
    sendRecycleEmail(customer){
        return this.api.sendRecycleEmail(customer)
    }

    /**
     * Set the shipping address for the cart
     * @param {object} address address object to pass to api
     * @param {bool} subscribe newsletter subscription boolean
     * @param {bool} subscribeSms sms subscription boolean
     */
    setShippingAddress(address, subscribe, subscribeSms, signUpSourceId){
        if(this.loading) return Promise.reject('Another request is in progress')

        this.loading = true
        return this.api.setShippingAddress(this.store.state.cart.cart.uuid, address, subscribe, subscribeSms, signUpSourceId).then(res => {
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

    getRecycleEmail(){
        return this.store.state.checkout.needsRecycleEmail
    }

    setRecycleEmail(needsEmail) {
        this.store.commit('checkout/setRecycleEmail', needsEmail)
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