import Api from './api'
import Repository from './repository'
import Service from './service'
import SetPay from './setpay'

export default function(context, paymentService){

    const api = new Api(context.api)
    const repository = new Repository(context.store, api, context.cart.repository, context.checkout.repository, context.config.setpayConfig)
    const setpay = SetPay.fromPaymentService(paymentService, context.config.setpayConfig, context.config.paymentEnvironment)
    const service = new Service(repository, setpay)

    context.checkout.setpay = service

}
