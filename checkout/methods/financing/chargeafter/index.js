import Api from './api'
import Repository from './repository'
import ChargeAfter from './chargeafter'
import Service from './service'

export default function(context, paymentService){

    const api = new Api(context.api)
    const repository = new Repository(context.store, api, context.cart.repository, context.checkout.repository)
    const chargeafter = ChargeAfter.fromPaymentService(paymentService, context.config.paymentEnvironment)
    const service = new Service(repository, chargeafter)

    context.checkout.chargeafter = service

}
