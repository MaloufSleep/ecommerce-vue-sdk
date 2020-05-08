import Vue from 'vue'
import { APIClient } from '@/api/client'
import { Services } from '@/services'
import Store from '@/store'
import Dinero from 'dinero.js'

import * as Components from '@/components'
import * as Filters from '@/utils/filters'

// create global event bus
const EventBus = new Vue()

// add styles to build process
import './styles/main.scss'

export default {
    install(Vue, options = {}){
        // Ensure store has been created
        if(!options.store){
            throw "Vuex store is a required option"
        }

        // Add the modules to the store
        for(let [key,value] of Object.entries(Store.Modules)){
            options.store.registerModule(key, value)
        }

        // If persisting to local storage
        if(options.persist){
            const persist = Store.Persistence()
            persist(options.store)
        }

        // Create API client
        const api = new APIClient({
            endpoint: options.api.endpoint,
            token: options.api.token
        })

        // Add to Vue prototype
        Vue.prototype.$services = new Services(api, options)
        Vue.prototype.$eventBus = EventBus

        // Add components
        Object.values(Components).forEach(component => {
            Vue.use(component)
        })

        // Add filters
        Object.values(Filters).forEach(filter => {
            Vue.use(filter)
        })
        
        // Configure currency
        Dinero.defaultCurrency = options.currency || 'USD'
    }
}

export { APIClient }
export * from '@/components'
export * from '@/utils/filters'

