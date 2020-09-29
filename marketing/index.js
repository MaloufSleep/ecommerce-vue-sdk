import Newsletter from './newsletter'
import Reviews from './reviews'

// module factory
export default function(context){

    const marketing = {
        newsletter: new Newsletter(context),
        reviews: new Reviews(context)
    }

    context.marketing = marketing
}