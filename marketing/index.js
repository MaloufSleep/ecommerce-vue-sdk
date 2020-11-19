import Newsletter from './newsletter'
import Reviews from './reviews'
import SMS from './sms'

// module factory
export default function(context){

    const marketing = {
        newsletter: new Newsletter(context),
        sms: new SMS(context),
        reviews: new Reviews(context)
    }

    context.marketing = marketing
}