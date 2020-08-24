import Cart from './entities/cart'

export default class CartRepository {

    constructor(store, api){
        this.store = store
        this.api = api

        this.verify()
    }

    verify(){
        // 20 min stale check
        if(!this.store.state.cart.cart?.updated || !this.store.state.cart.cart?.created) return Promise.resolve({})
        const now = new Date
        const modified = new Date(this.store.state.cart.cart?.updated || this.store.state.cart.cart?.created)
        if((now.getTime() - modified.getTime()) < (20 * 60 * 1000)) return Promise.resolve(this.store.state.cart.cart)

        return this.api.get(this.store.state.cart.cart.uuid).then(res => {
            this.store.commit('cart/set', res.data.data)
            return this.store.state.cart.cart
        }).catch(err => {
            // TODO: verify this error means cart should be deleted
            if(err.response){
                this.store.commit('cart/delete')
            }
            throw err
        })
    }

    get(){
        return new Cart(this.store.state.cart.cart)
    }

    set(cart){
        this.store.commit('cart/set', cart)
        return cart
    }

    addItems(items){
        return this.api.addItems(this.store.state.cart.cart?.uuid, items).then(res => {
            return this.set(res.data.data)
        }).catch(err => {
            if(err.response?.data?.data?.cart){
                this.set(err.response.data.data.cart)
            }
            throw err.response?.data
        })
    }

    updateItem(id, updates){
        return this.api.updateItem(this.store.state.cart.cart.uuid, id, updates).then(res => {
            return this.set(res.data.data)
        }).catch(err => {
            if(err.response?.data?.data?.cart){
                this.set(err.response.data.data.cart)
            }
            throw err.response?.data
        })
    }

    removeItems(ids){
        return this.api.removeItems(this.store.state.cart.cart.uuid, ids).then(res => {
            return this.set(res.data.data)
        })
    }
}
