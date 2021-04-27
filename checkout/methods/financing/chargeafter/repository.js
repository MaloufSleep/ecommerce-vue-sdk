export default class ChargeAfterRepository {

    constructor(store, api, cartRepository, checkoutRepository){
        this.store = store
        this.api = api
        this.cartRepository = cartRepository
        this.checkoutRepository = checkoutRepository
    }

    getCart(){
        return this.cartRepository.get()
    }

    process(data){
        const cart = this.getCart()
        return this.api.process(cart?.uuid, data).then(res => {
            this.cartRepository.set(res.data.cart)
            this.checkoutRepository.setOrder(res.data.order)
            return res
        })
    }
}
