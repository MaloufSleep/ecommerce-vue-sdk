import Newsletter from './newsletter'

// module factory
export default function(context){

    const marketing = {
        newsletter: new Newsletter(context)
    }

    context.marketing = marketing
}