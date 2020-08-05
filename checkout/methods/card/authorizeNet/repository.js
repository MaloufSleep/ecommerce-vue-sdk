export default class CardRepository {

    constructor(store, api){
        this.store = store
        this.api = api
    }

    processNonce(nonce, address){
        return this.api.nonce(this.store.state.cart.cart?.uuid, nonce, address).then(res => {
            this.store.commit('cart/set', res.data.cart)
            this.store.commit('checkout/setOrder', res.data.order)
            return res.data
        })
    }

}