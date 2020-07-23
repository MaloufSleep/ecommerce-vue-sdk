import Vuex from 'vuex'
import { createStore, createPersistence } from './store'
import APIClient from './api'

import * as Components from './components'
import * as Filters from './filters'

export default {
    install(Vue, options = {}){

        // create store and add to Vue instance
        Vue.use(Vuex)
        Vue.prototype.$store = createStore(Vuex)
        if(options.isClient) createPersistence(Vue.prototype.$store)

        // create new API client
        const api = new APIClient(
            options.api.endpoint,
            options.api.region
        )  
        
        // attach immutable API client to Vue instance
        Object.defineProperty(Vue.prototype, '$api', {
            get() { return api }
        })

        // add components
        Object.values(Components).forEach(component => {
            Vue.use(component)
        })

        // add filters
        Object.values(Filters).forEach(filter => {
            Vue.use(filter)
        })

        // check for stale cart
        if(options.isClient){
            Vue.prototype.$store.dispatch('cart/verify')
        }
    }
}

