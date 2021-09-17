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
     * Verify the Apple Pay merchant and retreive a new Apple Pay session
     * @param {string} url 
     */
    verify(url){
        const cart = this.cartRepository.get()
        return this.api.verify(cart?.uuid, url)
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

    /**
     * Process the cart via PayPal
     * @param {object} token 
     * @param {object} billingAddress 
     * @param {object} shippingAddress 
     */
    process(token, billingAddress, shippingAddress){
        const cart = this.cartRepository.get()
        return this.api.process(cart?.uuid, token, billingAddress, shippingAddress)
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
