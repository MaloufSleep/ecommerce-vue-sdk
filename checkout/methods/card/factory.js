import authorizeNet from './authorizeNet'

export default function(context, paymentService){

    switch(paymentService.merchant){
        case 'authorizenet': {
            authorizeNet(context, paymentService)
            break;
        }
        default: {
            console.warn(`Unsupported card merchant: ${paymentService.merchant}`)
            break;
        }
    }

}