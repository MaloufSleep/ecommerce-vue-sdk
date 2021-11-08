import { exception } from 'vue-gtag'
import isClient from '../../common/utils/isClient'

export default class YotpoService {
    constructor(repository) {
        this.repository = repository
        this.appKey = this.repository.getAppKey()
        if(this.appKey) {
            this.loadScript()
        } else {
            console.warn("Yotpo App Key Not Found")
        }
    }

    /**
     * Loads the Yotpo Script
     */
    loadScript() {
        if (!isClient()) return Promise.resolve(true)

        const src = `//staticw2.yotpo.com/${this.appKey}/widget.js`

        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            const tag = document.getElementsByTagName('script')[0]

            document.body.appendChild(script)
            script.onload = resolve
            script.onerror = reject
            script.async = true
            script.defer = true
            script.src = src
            tag.parentNode.insertBefore(script, tag)
        })
    }

    trackEvent(event, eventData){
        return this.repository.trackEvent(event, eventData)
    }
}