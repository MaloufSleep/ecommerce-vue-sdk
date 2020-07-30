const state = () => {
    return  {
        loading: false,
        cart: {}
    }
}

const getters = {
    itemCount: state => (type = 'active') => state.cart.items?.[type]?.reduce((total, item) => total + item.quantity, 0) || 0,
    items: state => (type = 'active') => state.cart.items?.[type] || [],
    uuid: state => state.cart.uuid
}

const mutations = {
    setCart(state, cart){
        state.cart = Object.assign({}, state.cart, cart)
    },
    deleteCart(state){
        state.cart = {}
    },
    setLoading(state, loading = false){
        state.loading = loading
    }
}

const actions = {
    launched(context){
        context.dispatch('verify')
    },

    /**
     * Verifies the age of the cart and refreshes if too old
     */
    verify(context){
        if(!(context.state.cart.updated || context.state.cart.created)) return Promise.resolve({})

        // Two hour stale check
        const now = new Date
        const modified = new Date(context.state.cart.updated || context.state.cart.created)
        if((now.getTime() - modified.getTime()) < (2 * 60 * 60 * 1000)) return Promise.resolve(context.state.cart)

        context.commit('setLoading', true)
        return this._vm.$api.cart.get(context.getters.uuid).then(res => {
            return onSuccess(res, context)
        }).catch(err => {
            // TODO: verify this error means cart should be deleted
            if(err.response){
                context.commit('deleteCart', {})
            }
            return onFailure(err, context)
        })
    },

    /**
     * Get the cart
     */
    get(context){
        if(!context.getters.uuid) throw 'Failed to get cart. Cart does not exist.'
        context.commit('setLoading', true)
        return this._vm.$api.cart.get(context.getters.uuid).then(res => onSuccess(res, context)).catch(err => onFailure(err, context))
    },

    /**
     * Clear the cart
     */
    clear(context){
        if(!context.getters.uuid) throw 'Failed to clear cart. Cart does not exist.'
        context.commit('setLoading', true)
        return this._vm.$api.cart.clear(context.getters.uuid).then(res => onSuccess(res, context)).catch(err => onFailure(err, context))
    },

    /**
     * Add items to the cart
     * @param {object|array} items
     */
    addItems(context, items){
        context.commit('setLoading', true)
        if(!Array.isArray(items)) items = [items]
        return this._vm.$api.cart.addItems(context.getters.uuid || null, items).then(res => onSuccess(res, context)).catch(err => onFailure(err, context))
    },

    /**
     * Updates an item in the cart
     * @param {int} id 
     * @param {object} item 
     */
    updateItem(context, {id, item}){
        if(!context.getters.uuid) throw 'Failed to update item. Cart does not exist.'
        context.commit('setLoading', true)
        return this._vm.$api.cart.updateItem(context.getters.uuid, id, item).then(res => onSuccess(res, context)).catch(err => onFailure(err, context))
    },
    
    /**
     * Removes an item from the cart
     * @param {int|array<int>} ids
     */
    removeItems(context, ids){
        if(!context.getters.uuid) throw 'Failed to remove item. Cart does not exist.'
        context.commit('setLoading', true)
        if(!Array.isArray(ids)) ids = [ids]
        return this._vm.$api.cart.removeItems(context.getters.uuid, ids).then(res => onSuccess(res, context)).catch(err => onFailure(err, context))
    },

    /**
     * Update the quantity of an item in the cart
     * @param {int} id 
     * @param {int} quantity 
     */
    updateQuantity(context, {id, quantity}){
        if(!context.getters.uuid) Promise.reject('Failed to update quantity. Cart does not exist.')
        quantity = Math.abs(Math.round(quantity))
        context.commit('setLoading', true)
        return this._vm.$api.cart.updateItem(context.getters.uuid, id, {quantity}).then(res => onSuccess(res, context)).catch(err => onFailure(err, context))
    },

    /**
     * Saves an item for later
     * @param {int} id - cart item ID
     */
    saveItem(context, id){
        if(!context.getters.uuid) Promise.reject('Failed to save item. Cart does not exist.')
        context.commit('setLoading', true)
        return this._vm.$api.cart.updateItem(context.getters.uuid, id, {type: 'saved'}).then(res => onSuccess(res, context)).catch(err => onFailure(err, context))
    },

    /**
     * Set the shipping address for the cart
     * @param {object} address
     */
    setShippingAddress(context, address){
        if(!context.getters.uuid) Promise.reject('Failed to set shipping address. Cart does not exist.')
        context.commit('setLoading', true)
        return this._vm.$api.cart.setShippingAddress(context.getters.uuid, address).then(res => onSuccess(res, context)).catch(err => onFailure(err, context))
    },

    /**
     * Set the shipping service for the cart
     * @param {int} id - shipping service ID
     */
    setShippingService(context, id){
        if(!context.getters.uuid) throw 'Failed to set shipping service. Cart does not exist.'
        context.commit('setLoading', true)
        return this._vm.$api.cart.setShippingService(context.getters.uuid, id).then(res => onSuccess(res, context)).catch(err => onFailure(err, context))
    },

    /**
     * Called when an order has been completed
     * @param {object} response - response from the processing call
     */
    setCart(context, cart){
        context.commit('setCart', cart)
    },
}

const onSuccess = (response, context) => {
    context.commit('setCart', response.data.data)
    context.commit('setLoading')
    return response.data.data
}

const onFailure = (error, context) => {
    context.commit('setLoading')
    throw error
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}