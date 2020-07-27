import createPersistedState from 'vuex-persistedstate'
import SecureLS from "secure-ls";

import cart from './modules/cart'
import checkout from './modules/checkout'
import site from './modules/site'
import payment from './modules/payment'
import user from './modules/user'

export const createPersistence = (store) => {
    const ls = new SecureLS({isCompression: true})
    createPersistedState({
        key: '__ecommerce__',
        storage: {
            getItem: key => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: key => ls.remove(key)
        },
        paths: [
            'site',
            'user',
            'cart.cart',
            'checkout',
        ]
    })(store)
}

export const createStore = (Vuex) => {
    return new Vuex.Store({
        modules: {
            cart,
            checkout,
            site,
            payment,
            user
        }
    })
}