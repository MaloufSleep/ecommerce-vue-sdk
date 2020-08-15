import AuthorizeNet from './authorizeNet'
import Api from './api'
import Repository from './repository'
import Service from './service'

export default function(context, paymentService){
    const api = new Api(context.api)
    const repository = new Repository(context.store, api)
    const authNet = AuthorizeNet.fromPaymentService(paymentService, context.config.paymentEnvironment)
    const service = new Service(repository, authNet)

    context.checkout.card = service
}