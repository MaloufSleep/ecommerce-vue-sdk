import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from "secure-ls";
import isClient from '../../common/utils/isClient'

// modules
import site from './modules/site'
import cart from './modules/cart'
import checkout from './modules/checkout'

export default function(Vue){
    Vue.use(Vuex)
    const store = new Vuex.Store({
        modules: {
            site,
            cart,
            checkout
        }
    })

    // prevent localStorage with SSR
    if(isClient()){
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