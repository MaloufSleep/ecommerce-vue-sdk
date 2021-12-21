import Newsletter from './newsletter'
import Reviews from './reviews'
import SMS from './sms'
import yotpo from './yotpo'

// module factory
export default function(context){

    const marketing = {
        newsletter: new Newsletter(context),
        sms: new SMS(context),
        reviews: new Reviews(context),
        yotpo: new yotpo(context)
    }

    context.marketing = marketing
}