import synchrony from './synchrony'
import setpay from './setpay'
import chargeafter from './chargeafter'

export default function(context, paymentService){

    switch(paymentService.merchant){
        case 'synchrony': {
            synchrony(context, paymentService)
            break;
        }
        case 'setpay': {
            setpay(context, paymentService)
            break;
        }
        case 'chargeafter': {
            chargeafter(context, paymentService)
            break;
        }
        default: {
            console.warn(`Unsupported financing merchant: ${paymentService.merchant}.`)
        }
    }

}