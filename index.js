// core functionality
import Config from './core/config'
import StoreFactory from './core/store'
import ApiFactory from './core/api'
import modules from './core/modules'

// filters
import * as Filters from './common/filters'

class Ecommerce {

    constructor(config = new Config){
        this.config = config
    }

    install(Vue, options = {}){
        Vue.prototype.$ecommerce = this

        // configure core features
        this.Vue = Vue
        this.store = StoreFactory(Vue)
        this.api = ApiFactory(this.config.endpoint, this.store)

        // bootstrap modules
        modules.forEach(module => {
            module(this)
        })

        // make filters available
        Object.values(Filters).forEach(filter => {
            Vue.use(filter)
        })
    }

    registerModule(module){
        module(this)
    }

} 

export default Ecommerce
