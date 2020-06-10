import { APIClient } from '@/api/client'
import Services from '@/services'
import Store from '@/store'
import Dinero from 'dinero.js'

import * as Components from '@/components'
import * as Filters from '@/utils/filters'

// add styles to build process
import './styles/main.scss'

export { APIClient }
export * from '@/components'
export * from '@/utils/filters'

export default {
    install(Vue, options = {}){

        // Add the modules to the store
        for(let [key,value] of Object.entries(Store.Modules)){
            options.store.instance.registerModule(key, value)
        }

        // If persisting to local storage
        if(options.store.persist){
            const persist = Store.Persistence()
            persist(options.store.instance)
        }

        // Create API client
        const api = new APIClient({
            endpoint: options.api.endpoint,
            reference: options.api.reference,
            locale: options.api.locale
        })

        // Add to Vue prototype
        Vue.prototype.$services = new Services(api, options.store.instance, options)

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

