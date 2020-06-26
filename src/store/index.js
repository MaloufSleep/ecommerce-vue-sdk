import createPersistedState from 'vuex-persistedstate'
import SecureLS from "secure-ls";

import cart from './cart'
import user from './user'
import checkout from './checkout'

function Persistence(){
    const ls = new SecureLS({ isCompression: true });
    return createPersistedState({
        key: '__ecommerce__',
        storage: {
            getItem: key => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: key => ls.remove(key)
        }
    })
}

const Modules = {
    cart,
    user,
    checkout
}

export default {
    Modules,
    Persistence
}