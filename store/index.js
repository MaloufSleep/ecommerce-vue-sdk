import createPersistedState from 'vuex-persistedstate'
import SecureLS from "secure-ls";
import store from './store'

const persistedPaths = [
    'site',
    'user',
    'cart.cart',
    'checkout',
]

export const createPersistence = (store) => {
    const ls = new SecureLS({isCompression: true})
    createPersistedState({
        key: '__ecommerce__',
        storage: {
            getItem: key => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: key => ls.remove(key)
        },
        paths: persistedPaths
    })(store)
}

export const createStore = (Vuex) => {
    return new Vuex.Store(store)
}