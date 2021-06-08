import VueGtag from "vue-gtag"
import isClient from '../../../common/utils/isClient'
import SiteTracker from '../tracker'

export default class GtagTracker extends SiteTracker {
    constructor(context, gtagConfig) {
        super(context, gtagConfig)
        this.gtagConfig = gtagConfig

        if(!this.gtagConfig?.config && process.env.NODE_ENV !== 'production') console.warn(`Gtag config object not found.`);

        this.loadScript()

        context.tracking.gtag = this
    }

    loadScript() {
        if(!isClient || (typeof window !== 'undefined' && window?.gtag)) return Promise.resolve(true)

        return new Promise((resolve, reject) => {
            this.context.Vue.use(VueGtag, this.gtagConfig.config, this.gtagConfig.router)
        })
    }

    optIn(){
        super.optIn()
        this.loadScript()

        this.context.Vue.$gtag.optIn()
        if (window?.gtag) {
            window.gtag('consent', 'update', {
                'ad_storage': 'granted',
                'analytics_storage': 'granted'
            });
        }
    }

    optOut() {
        this.context.Vue.$gtag.optOut()
        if (window?.gtag) {
            window.gtag('consent', 'update', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied'
            });
        }
    }
}