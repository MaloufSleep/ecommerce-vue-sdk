import synchrony from './synchrony'

export default function(context, paymentService){

    switch(paymentService.merchant){
        case 'synchrony': {
            synchrony(context, paymentService)
            break;
        }
        default: {
            console.warn(`Unsupported financing merchant: ${paymentService.merchant}.`)
        }
    }

}