import VueGtm from "vue-gtm"
import isClient from '../../../common/utils/isClient'
import SiteTracker from '../tracker'

export default class GtmTracker extends SiteTracker {
  constructor(context, gtmConfig) {
    super(context, gtmConfig)
    this.config = gtmConfig?.config

    if(!this.config && process.env.NODE_ENV !== 'production') console.warn(`GTM config object not found.`);

    context.tracking.gtm = this
  }

  optIn(){
    super.optIn()

    return new Promise((resolve, reject) => {
        this.context.Vue.use(VueGtm, this.config)
    })
  }
}