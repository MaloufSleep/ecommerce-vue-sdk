import Api from './api'
import Repository from './repository'
import Service from './service'

import * as Components from './ui/components'

export default function(context, paymentService){
    const clientId = paymentService.credentials?.find(item => item.type?.key == 'paypal-client-id')?.value
    if(!clientId) return console.error("Apple Pay credentials missing or undefined")

    const api = new Api(context.api)
    const repository = new Repository(
        context.store, 
        api, 
        context.site.repository, 
        context.cart.repository,
        context.checkout.repository
    )

    const service = new Service(clientId, repository, context.config.paymentEnvironment)

    // register components
    Object.values(Components).forEach(component => {
        context.Vue.use(component)
    })

    context.checkout.paypal = service
}