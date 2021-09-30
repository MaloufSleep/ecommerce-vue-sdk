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
     * Set the shipping service
     * @param service_id
     */
    setShippingAddress(address, service_id){
        const cart = this.getCart()

        if (cart.shipping_address == null) {
            return this.api.shipping(cart.uuid, address).then(data => {
                this.cartRepository.set(data)
                return data
            })
        }

        if(cart.shipping_service.id != service_id) {
            return this.checkoutRepository.setShippingService(service_id).then(cart => {
                return this.api.shipping(cart?.uuid, address).then(data => {
                    this.cartRepository.set(data)
                    return data
                })
            })
        }
    }

    process(orderId, authorizationId){
        const cart = this.getCart()

        return this.api.process(cart?.uuid, orderId, authorizationId)
        .then(data => {
            this.cartRepository.set(data.cart)
            this.checkoutRepository.setOrder(data.order)
            return data
        }).catch(err => {
            if(err.cart) this.cartRepository.set(err.cart)
            throw err
        })
    }
}
