
export class CartService{

    #api
    #store

    constructor(api, store){
        this.#api = api
        this.#store = store
    }

    findItem(product_id){
        return this.#store.state.cart.items.find(el => el.product_id == product_id)
    }

    getReference(){
        return this.#store.state.cart.reference || null
    }

    setCartInStore(cart){
        this.#store.commit('cart/setCart', cart)
    }

    addItem(item){
        return this.#api.cart.addItem(item, this.getReference()).then(res => {
            console.log(res.data)
            this.setCartInStore(res.data)
            return res.data
        })
    }

    updateItem(item){
        return this.#api.cart.updateItem(this.getReference(), item).then(res => {
            this.setCartInStore(res.data)
            return res.data
        })
    }

    removeItem(product_id){
        let item = this.findItem(product_id)
        if(!item) throw `removeItem: unable to find item with product_id: ${product_id}`

        return this.#api.cart.removeItem(this.getReference(), product_id).then(res => {
            this.setCartInStore(res.data)
            return res.data
        })
    }

    updateQuantity(product_id, quantity){
        quantity = Math.round(quantity)
        if(quantity <= 0) throw `updateQuantity: invalid quantity of ${quantity} passed`

        let item = this.findItem(product_id)
        if(!item) throw `updateQuantity: No item in the cart matching a product_id of ${product_id}`

        return this.#api.cart.updateItem(this.getReference(), {
            product_id,
            quantity
        }).then(res => {
            this.setCartInStore(res.data)
            return res.data
        })
    }

    saveItem(product_id){
        let item = this.findItem(product_id)
        if(!item) throw `saveItem: unable to find item with product_id: ${product_id}`

        return this.#api.cart.saveItem(this.getReference(), product_id).then(res => {
            this.setCartInStore(res.data)
            return res.data
        })
    }
}