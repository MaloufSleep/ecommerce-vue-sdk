
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

    getReference(){
        return this.#store.state.cart.reference || null
    }

    setCart(cart){
        this.#store.commit('cart/setCart', cart)
    }

    addItem(item){
        return this.#api.cart.addItem(this.getReference(), item).then(res => {
            this.setCart(res.data)
            return res.data
        })
    }

    updateItem(id, updates){
        return this.#api.cart.updateItem(this.getReference(), id, updates).then(res => {
            this.setCart(res.data)
            return res.data
        })
    }

    removeItem(id){
        let item = this.findItemById(id)
        if(!item) throw `removeItem: unable to find item with id: ${id}`

        return this.#api.cart.removeItem(this.getReference(), id).then(res => {
            this.setCart(res.data)
            return res.data
        })
    }

    updateQuantity(id, quantity){
        quantity = Math.abs(Math.round(quantity))

        let item = this.findItemById(id)
        if(!item) throw `updateQuantity: unable to find item with id: ${id}`

        return this.#api.cart.updateItem(this.getReference(), id, {quantity}).then(res => {
            this.setCart(res.data)
            return res.data
        })
    }

    saveItem(id){
        let item = this.findItemById(id)
        if(!item) throw `saveItem: unable to find item with id: ${id}`

        return this.#api.cart.updateItem(this.getReference(), id, {type_id: 2}).then(res => {
            this.setCart(res.data)
            return res.data
        })
    }
}