import isClient from '../../../common/utils/isClient'
import SiteTracker from '../tracker'

export default class PinterestTracker extends SiteTracker {
    constructor(context, pinterestConfig){
        super(context, pinterestConfig)
        this.pid = pinterestConfig.id

        if(!this.pid && process.env.NODE_ENV !== 'production') console.warn(`Pinterest ID not found.`);

        context.tracking.pinterest = this
    }

    optIn(){
        super.optIn()
        
        const innerHTML = `!function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(
        Array.prototype.slice.call(arguments))};var
        n=window.pintrk;n.queue=[],n.version="3.0";var
        t=document.createElement("script");t.async=!0,t.src=e;var
        r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
        pintrk('load', '${this.pid}');
        pintrk('page');`

        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            document.body.appendChild(script)
            script.onload = resolve
            script.onerror = reject
            script.async = true
            script.defer = true
            script.id = 'pinterest'
            script.innerHTML = innerHTML
        })
    }
}