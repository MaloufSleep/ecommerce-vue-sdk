import isClient from '../../../common/utils/isClient'
import SiteTracker from '../tracker'

export default class MiscTracker extends SiteTracker {
  constructor(context, trackerConfig){
      super(context, trackerConfig)
      this.config = trackerConfig
  }

  optIn(){
      super.optIn()
      
      const innerHTML = this.config.innerHTML
      const src = this.config.src

      return new Promise((resolve, reject) => {
          const script = document.createElement('script')
          document.body.appendChild(script)
          script.onload = resolve
          script.onerror = reject
          script.async = true
          script.defer = true
          script.id = 'misc'

          if (innerHTML) {
            script.innerHTML = innerHTML
          }
          if (src) {
            script.src = src
          }
      })
  }
}