import VueGtag from "vue-gtag"
import isClient from '../../../common/utils/isClient'
import SiteTracker from '../tracker'

export default class GtagTracker extends SiteTracker {
    constructor(context, gtagConfig) {
        super(context, gtagConfig)
        this.gtagConfig = gtagConfig?.config

        if(!this.gtagConfig?.config && process.env.NODE_ENV !== 'production') console.warn(`Gtag config object not found.`);
    }

    optIn(){
        if(!isClient() || window.gtag) return Promise.resolve(true)

        return new Promise((resolve, reject) => {
            this.context.Vue.use(VueGtag, this.gtagConfig.config, this.gtagConfig.router)
        })
    }
}