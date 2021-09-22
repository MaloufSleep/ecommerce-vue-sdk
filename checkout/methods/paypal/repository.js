export default class PayPalRepository {

    constructor(store, api, siteRepository, cartRepository, checkoutRepository){
        this.store = store
        this.api = api
        this.siteRepository = siteRepository
        this.cartRepository = cartRepository
        this.checkoutRepository = checkoutRepository
    }

    getCart(){
        return this.cartRepository.get()
    }

    getRegion(){
        return this.siteRepository.getRegion()
    }

    /**
     * Set the shipping address
     * @param {object} address 
     */
    setShippingAddress(address){
        const cart = this.cartRepository.get()
        return this.api.shipping(cart?.uuid, address).then(data => {
            this.cartRepository.set(data)
            return data
        })
    }

    // createOrder(){
    //     const cart = this.cartRepository.get()

    //     return this.api.createOrder(cart?.uuid)
    //     .then(data => {
    //         this.cartRepository.set(data.cart)
    //         this.checkoutRepository.setOrder(data.order)
    //         return data
    //     }).catch(err => {
    //         if(err.cart) this.cartRepository.set(err.cart)
    //         throw err
    //     })
    // }

    process(authorizationId){
        const cart = this.cartRepository.get()

        return this.api.process(cart?.uuid, authorizationId)
        .then(data => {
            this.cartRepository.set(data.cart)
            this.checkoutRepository.setOrder(data.order)
            return data
        }).catch(err => {
            if(err.cart) this.cartRepository.set(err.cart)
            throw err
        })
    }

    /**
     * Set the shipping service
     * @param {int} service_id
     */
    setShippingService(service_id){
        return this.checkoutRepository.setShippingService(service_id)
    }

}
