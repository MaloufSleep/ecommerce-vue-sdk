
export class CartService {

    #api
    #store

    /**
     * 
     * @param {object} api - api client
     * @param {object} store - Vuex store
     */
    constructor(api, store){
        this.#api = api
        this.#store = store
    }

    /**
     * Find a cart item by item ID
     * @param {int} id 
     */
    findItemById(id){
        return this.#store.state.cart.items.find(el => el.id == id)
    }

    /**
     * Find a cart item by a product ID
     * @param {int} product_id 
     */
    findItemByProductId(product_id){
        return this.#store.state.cart.items.find(el => el.product_id == product_id) 
    }

    /**
     * Get the UUID of the current cart
     */
    getUuid(){
        return this.#store.state.cart.uuid || null
    }

    /**
     * Persist the cart to local storage
     * @param {object} cart 
     */
    setCart(cart){
        this.#store.commit('cart/setCart', cart)
    }

    /**
     * Get the cart
     */
    getCart(){
        return this.#api.cart.get(this.getUuid()).then(res => {
            let cart = res.data.data
            this.setCart(cart)
            return cart
        })
    }

    /**
     * Add a single item to the cart
     * @param {object} item
     */
    addItem(item){
        return this.#api.cart.addItems(this.getUuid(), [item]).then(res => {
            let cart = res.data.data
            this.setCart(cart)
            return cart
        })
    }

    /**
     * Add multiple items to the cart
     * @param {object[]} items - array of item objects to be added
     */
    addItems(items){
        return this.#api.cart.addItems(this.getUuid(), items).then(res => {
            let cart = res.data.data
            this.setCart(cart)
            return cart
        })
    }

    /**
     * Updates an item in the cart
     * @param {int} id 
     * @param {object} updates 
     */
    updateItem(id, updates){
        let item = this.findItemById(id)
        if(!item) throw `updateItem: unable to find item with id: ${id}`

        return this.#api.cart.updateItem(this.getUuid(), id, updates).then(res => {
            let cart = res.data.data
            this.setCart(cart)
            return cart
        })
    }

    /**
     * Removes an item from the cart
     * @param {int} id 
     */
    removeItem(id){
        let item = this.findItemById(id)
        if(!item) throw `removeItem: unable to find item with id: ${id}`

        return this.#api.cart.removeItems(this.getUuid(), [id]).then(res => {
            let cart = res.data.data
            this.setCart(cart)
            return cart
        })
    }

    /**
     * Update the quantity of an item in the cart
     * @param {int} id 
     * @param {int} quantity 
     */
    updateQuantity(id, quantity){
        quantity = Math.abs(Math.round(quantity))

        let item = this.findItemById(id)
        if(!item) throw `updateQuantity: unable to find item with id: ${id}`

        return this.#api.cart.updateItem(this.getUuid(), id, {quantity}).then(res => {
            let cart = res.data.data
            this.setCart(cart)
            return cart
        })
    }

    /**
     * Saves an item for later
     * @param {int} id - cart item ID
     */
    saveItem(id){
        let item = this.findItemById(id)
        if(!item) throw `saveItem: unable to find item with id: ${id}`

        return this.#api.cart.updateItem(this.getUuid(), id, {type: 'saved'}).then(res => {
            let cart = res.data.data
            this.setCart(cart)
            return cart
        })
    }

    /**
     * Set the shipping address for the cart
     * @param {object} address
     */
    setShippingAddress(address){
        return this.#api.cart.setShippingAddress(this.getUuid(), address).then(res => {
            let cart = res.data.data
            this.setCart(cart)
            return cart
        })
    }

    /**
     * Set the shipping service for the cart
     * @param {int} id - shipping service ID
     */
    setShippingService(id){
        return this.#api.cart.setShippingService(this.getUuid(), id).then(res => {
            let cart = res.data.data
            this.setCart(cart)
            return cart
        })
    }
}