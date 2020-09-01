import Api from './api'
import Repository from './repository'
import Service from './service'

import paymentMethodsFactory from './methods/factory'

export default function(context){

    const api = new Api(context.api)
    const repository = new Repository(context.store, api, context.site.repository, context.cart.repository)
    const service = new Service(repository)
    context.checkout = service

    paymentMethodsFactory(context, service.getPaymentServices())
}