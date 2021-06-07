import isClient from '../../../common/utils/isClient'
import SiteTracker from '../tracker'

export default class FacebookTracker extends SiteTracker {
    constructor(context, fbConfig){
        super(context, fbConfig)
        this.fbid = fbConfig.id

        if(!this.fbid && process.env.NODE_ENV !== 'production') console.warn(`Facebook tracking ID not found.`);

        context.tracking.facebook = this
    }

    optIn(){
        if(!isClient() || window.fbq) return Promise.resolve(true)

        const innerHTML = `!function(f,b,e,v,n,t,s) {if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0'; n.queue=[];t=b.createElement(e);t.async=!0; t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script', 'https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '${this.fbid}');`

        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            document.body.appendChild(script)
            script.onload = resolve
            script.onerror = reject
            script.async = true
            script.defer = true
            script.id = 'fb-pixel'
            script.innerHTML = innerHTML
        })
    }
}