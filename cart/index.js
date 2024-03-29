import Api from './api'
import Repository from './repository'
import Service from './service'

import * as Components from './ui/components'

// module factory
export default function(context){
    
    // construct cart objects
    const api = new Api(context.api)
    const repository = new Repository(context.store, api)
    const service = new Service(repository)

    // register components
    Object.values(Components).forEach(component => {
        context.Vue.use(component)
    })

    context.cart = service
}