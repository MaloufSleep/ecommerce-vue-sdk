import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from "secure-ls";

// modules
import site from './modules/site'
import cart from './modules/cart'

export default function(context){
    context.Vue.use(Vuex)
    const store = new Vuex.Store({
        modules: {
            site,
            cart
        }
    })

    // prevent localStorage with SSR
    const isClient = (typeof window !== 'undefined')
    if(isClient){
        const ls = new SecureLS({isCompression: true})
        createPersistedState({
            key: '__ecommerce__',
            storage: {
                getItem: key => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: key => ls.remove(key)
            },
        })(store)
    }

    return store
}