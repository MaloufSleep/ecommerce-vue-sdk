import Dinero from 'dinero.js'
import minorCurrency from '@/utils/conversions/minorCurrency'


export class CartService {

    #api
    #store

    constructor(api, store){
        this.#api = api
        this.#store = store
    }

    findItem(id,list){
        let index = this.#store.state.cart.items[list].findIndex(el => el.id == id)
        if(index >= 0){
            return {
                index,
                item: this.#store.state.cart.items[list][index]
            }
        }
        return undefined
    }

    addItem(item){
        item.quantity = Math.round(Math.abs(item.quantity))
        item.price = minorCurrency(Math.abs(item.price))
        item.price = Dinero({amount: item.price}).getAmount()

        let addedItem = this.findItem(item.id, 'added')
        if(addedItem){
            item.quantity += addedItem.item.quantity
            this.#store.commit('cart/updateCartItem', {index: addedItem.index, item})
        }else{
            this.#store.commit('cart/newCartItem', item)
        }
    }

    removeItem(id){
        let item = this.findItem(id, 'added')
        if(item){
            this.#store.commit('cart/deleteCartItem', item.index)
            this.#store.commit('cart/newRemovedItem', item.item)
        }
    }

    updateQuantity(id, quantity){
        quantity = Math.round(Math.abs(quantity))
        let item = this.findItem(id, 'added')
        if(item){
            item.item.quantity = quantity
            this.#store.commit('cart/updateCartItem', item)
        }
    }

    adjustQuantity(id, adjustment){
        adjustment = Math.round(adjustment)
        let item = this.findItem(id, 'added')
        if(item){
            if(adjustment < 0 && item.item.quantity <= Math.abs(adjustment)){
                console.error('Adjusted quantity is less than quantity in cart')
                return
            }
            item.item.quantity += adjustment
            this.#store.commit('cart/updateCartItem', item)
        }
    }

    saveItem(id){
        let item = this.findItem(id, 'added')
        if(item){
            this.#store.commit('cart/deleteCartItem', item.index)
            this.#store.commit('cart/newSavedItem', item.item)
        }
    }

    addSavedItem(id){
        let item = this.findItem(id, 'saved')
        if(item){
            this.#store.commit('cart/deleteSavedItem', item.index)
            this.addItem(item.item)
        }
    }

    deleteSavedItem(id){
        let item = this.findItem(id, 'saved')
        if(item){
            this.#store.commit('cart/deleteSavedItem', item.index)
        }
    }

    addRemovedItem(id){
        let item = this.findItem(id, 'removed')
        if(item){
            this.#store.commit('cart/deleteRemovedItem', item.index)
            this.addItem(item.item)
        }
    }

    deleteRemovedItem(id){
        let item = this.findItem(id, 'removed')
        if(item){
            this.#store.commit('cart/deleteRemovedItem', item.index)
        }
    }
}