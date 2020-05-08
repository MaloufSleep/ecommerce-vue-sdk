import Dinero from 'dinero.js'
import Address from '@/entities/address'

const state = () => {
    return  {
        items: {
            added: [],
            saved: [],
            removed: [],
        },
        promotions: {},
        shipping: {
            address: new Address()
        },
        billing: {
            sameAsShipping: true,
            address: new Address()
        }
    }
}

const getters = {
    totals: state => {
        // subtotal
        let subtotal = Dinero()
        state.items.added.forEach(item => {
            let itemSubtotal = Dinero({amount: item.price}).multiply(item.quantity)
            subtotal = subtotal.add(itemSubtotal)
        })
        
        // TODO: discount
        let discount = Dinero()

        // TODO: tax
        let tax = Dinero()

        // TODO: shippping
        let shipping = Dinero()

        // total
        let total = subtotal.subtract(discount).add(tax).add(shipping)
        
        return {
            subtotal: subtotal.toFormat(),
            discount: discount.toFormat(),
            tax: tax.toFormat(),
            shipping: shipping.toFormat(),
            total: total.toFormat()
        }
    },
    itemCount: state => {
        let count = 0
        state.items.added.forEach(item => count += item.quantity)
        return count
    }
}

const mutations = {
    newCartItem(state, item){
        state.items.added.push(item)
    },
    deleteCartItem(state, index){
        state.items.added.splice(index, 1)
    },
    updateCartItem(state, payload){
        let item = state.items.added[payload.index]
        Object.assign(item, payload.item)
    },
    newSavedItem(state, item){
        state.items.saved.push(item)
    },
    deleteSavedItem(state, index){
        state.items.saved.splice(index, 1)
    },
    newRemovedItem(state, item){
        state.items.removed.push(item)
    },
    deleteRemovedItem(state, index){
        state.items.removed.splice(index, 1)
    }
}

const actions = {
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}