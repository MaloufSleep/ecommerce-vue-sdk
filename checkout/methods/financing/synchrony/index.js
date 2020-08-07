import Api from './api'
import Repository from './repository'
import Service from './service'
import Synchrony from './synchrony'

export default function(context, paymentService){

    const api = new Api(context.api)
    const repository = new Repository(context.store, api)
    const synchrony = Synchrony.fromPaymentService(paymentService)
    const service = new Service(repository, synchrony)

    context.checkout.synchrony = service

}