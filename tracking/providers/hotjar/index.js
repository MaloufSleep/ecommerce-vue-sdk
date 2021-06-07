import isClient from '../../../common/utils/isClient'
import SiteTracker from '../tracker'

export default class HotjarTracker extends SiteTracker {
    constructor(context, hotjarConfig){
        super(context, hotjarConfig)
        this.settings = hotjarConfig?.settings

        if(!this.settings && process.env.NODE_ENV !== 'production') console.warn(`Hotjar settings object not found.`);

        context.tracking.hotjar = this
    }

    optIn(){
        if(!isClient()) return Promise.resolve(true)
        const innerHTML = `(function(h,o,t,j,a,r){ h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)}; h._hjSettings=${JSON.stringify(this.settings)}; a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1; r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv; a.appendChild(r); })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`

        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            document.body.appendChild(script)
            script.onload = resolve
            script.onerror = reject
            script.async = true
            script.defer = true
            script.id = 'hotjar'
            script.innerHTML = innerHTML
        })
    }
}