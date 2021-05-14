export default class NewsletterRepository {

    constructor(store, api){
        this.store = store
        this.api = api
    }

    subscribe(email, first_name = null, last_name = null){
        const cartUuid = this.store.state.cart.cart?.uuid
        if(!cartUuid) this.store.commit('cart/setCustomer', {email, first_name, last_name})

        return this.api.subscribe(email, first_name, last_name, cartUuid)
    }

    unsubscribe(email){
        return this.api.unsubscribe(email)
    }
}