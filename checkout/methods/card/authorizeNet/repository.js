export default class CardRepository {

    constructor(store, api, cartRepository, checkoutRepository){
        this.store = store
        this.api = api
        this.cartRepository = cartRepository
        this.checkoutRepository = checkoutRepository
    }

    processNonce(nonce, address){
        return this.api.nonce(this.store.state.cart.cart?.uuid, nonce, address).then(res => {
            this.cartRepository.set(res.data.cart)
            this.checkoutRepository.setOrder(res.data.order)
            return res.data
        })
    }

}