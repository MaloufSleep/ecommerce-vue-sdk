import Api from './api'
import Repository from './repository'
import Service from './service'

import * as Components from './ui/components'

export default function(context, paymentService){
    const api = new Api(context.api)
    const repository = new Repository(
        context.store, 
        api, 
        context.site.repository, 
        context.cart.repository,
        context.checkout.repository
    )
    const service = new Service(repository, context.config.paymentEnvironment)

    // register components
    Object.values(Components).forEach(component => {
        context.Vue.use(component)
    })
    
    context.checkout.paypal = service
}