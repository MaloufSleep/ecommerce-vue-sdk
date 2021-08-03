import Facebook from './providers/facebook'
import Drip from './providers/drip'
import Hotjar from './providers/hotjar'
import Gtag from './providers/gtag'
import Gtm from './providers/gtm'
import Pinterest from './providers/pinterest'
import Misc from './providers/misc'
import Rakuten from './providers/rakuten'

export default function(context, trackerConfig){

    switch(trackerConfig.type){
        case 'drip': {
            return new Drip(context, trackerConfig)
        }
        case 'facebook': {
            return new Facebook(context, trackerConfig)
        }
        case 'hotjar': {
            return new Hotjar(context, trackerConfig)
        }
        case 'gtag': {
            return new Gtag(context, trackerConfig)
        }
        case 'gtm': {
            return new Gtm(context, trackerConfig)
        }
        case 'pinterest': {
            return new Pinterest(context, trackerConfig)
        }
        case 'rakuten': {
            return new Rakuten(context, trackerConfig)
        }
        case 'misc': {
            return new Misc(context, trackerConfig)
        }
        default: {
            if(process.env.NODE_ENV !== 'production') console.warn(`Unsupported tracker type ${trackerConfig.type}`)
        }
    }

}