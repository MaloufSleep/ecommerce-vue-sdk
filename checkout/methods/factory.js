import cardFactory from './card/factory'
import financingFactory from './financing/factory'
import applePay from './applepay'

export default function(context, paymentServices){

    paymentServices.forEach(paymentService => {
        switch(paymentService.type){
            case 'card': {
                cardFactory(context, paymentService)
                break
            }
            case 'apple-pay': {
                applePay(context, paymentService)
                break
            }
            case 'financing': {
                financingFactory(context, paymentService)
                break
            }
            default: {
                if(process.env.NODE_ENV !== 'production') console.warn(`Unsupported payment type ${paymentService.type}`)
            }
        }
    })

}