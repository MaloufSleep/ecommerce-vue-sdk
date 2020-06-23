
export class CartService{

    #api
    #store

    constructor(api, store){
        this.#api = api
        this.#store = store
    }

    findItemById(id){
        return this.#store.state.cart.items.find(el => el.id == id)
    }

    findItemByProductId(product_id){
        return this.#store.state.cart.items.find(el => el.product_id == product_id) 
    }

    getUuid(){
        return this.#store.state.cart.uuid || null
    }

    setCart(cart){
        this.#store.commit('cart/setCart', cart)
    }

    addItem(item){
        return this.#api.cart.addItem(this.getUuid(), item).then(res => {
            this.setCart(res.data)
            return res.data
        })
    }

    updateItem(id, updates){
        return this.#api.cart.updateItem(this.getUuid(), id, updates).then(res => {
            this.setCart(res.data)
            return res.data
        })
    }

    removeItem(id){
        let item = this.findItemById(id)
        if(!item) throw `removeItem: unable to find item with id: ${id}`

        return this.#api.cart.removeItem(this.getUuid(), id).then(res => {
            this.setCart(res.data)
            return res.data
        })
    }

    updateQuantity(id, quantity){
        quantity = Math.abs(Math.round(quantity))

        let item = this.findItemById(id)
        if(!item) throw `updateQuantity: unable to find item with id: ${id}`

        return this.#api.cart.updateItem(this.getUuid(), id, {quantity}).then(res => {
            this.setCart(res.data)
            return res.data
        })
    }

    saveItem(id){
        let item = this.findItemById(id)
        if(!item) throw `saveItem: unable to find item with id: ${id}`

        return this.#api.cart.updateItem(this.getUuid(), id, {type: 'saved'}).then(res => {
            this.setCart(res.data)
            return res.data
        })
    }
}