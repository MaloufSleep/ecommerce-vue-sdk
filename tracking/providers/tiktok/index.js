import isClient from '../../../common/utils/isClient'
import SiteTracker from '../tracker'

export default class TiktokTracker extends SiteTracker {
    constructor(context, ttConfig){
        super(context, ttConfig)
        this.ttid = ttConfig.id

        if(!this.ttid && process.env.NODE_ENV !== 'production') console.warn(`Tiktok tracking ID not found.`);

        context.tracking.tiktok = this
    }

    optIn(){
        super.optIn()

        const innerHTML = `//part1
        !function (w, d, t) {
          w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};

        //part2
          ttq.load('${this.ttid}');
          ttq.page();
        }(window, document, 'ttq');`

        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            document.head.appendChild(script)
            script.onload = resolve
            script.onerror = reject
            script.async = true
            script.defer = false
            script.id = 'tiktok-pixel'
            script.innerHTML = innerHTML
        })
    }
}