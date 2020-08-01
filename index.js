// core functionality
import Config from './core/config'
import StoreFactory from './core/store'
import ApiFactory from './core/api'

// modules
import SiteModule from './site'
import CartModule from './cart'

// filters
import * as Filters from './common/filters'

class Ecommerce {

    constructor(config = new Config){
        this.context = {
            config
        }
        this.modules = {
            site: SiteModule,
            cart: CartModule
        }
    }

    install(Vue, options = {}){
        Vue.prototype.$ecommerce = this

        // configure core features
        this.context.Vue = Vue
        this.context.store = StoreFactory(this.context)
        this.context.api = ApiFactory(this.context)

        // bootstrap modules
        for(const [key, value] of Object.entries(this.modules)){
            this[key] = value(this.context)
        }

        // make filters available
        Object.values(Filters).forEach(filter => {
            Vue.use(filter)
        })
    }

} 

export default Ecommerce
