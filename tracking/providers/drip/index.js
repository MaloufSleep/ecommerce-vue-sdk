import isClient from '../../../common/utils/isClient'
import SiteTracker from '../tracker'

export default class DripTracker extends SiteTracker {
    constructor(context, dripConfig){
        super(context, dripConfig)
        this.accountId = dripConfig.accountId

        if(!this.accountId && process.env.NODE_ENV !== 'production') console.warn(`Drip Account ID not found.`);

        context.tracking.drip = this
    }

    optIn(){
        super.optIn()
        
        const innerHTML = `var _dcq = _dcq || []; var _dcs = _dcs || {}; _dcs.account = '${this.accountId}'; (function()
        { var dc = document.createElement('script'); dc.type = 'text/javascript'; dc.async = true; dc.src =
        '//tag.getdrip.com/${this.accountId}.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(dc, s); })();`

        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            document.body.appendChild(script)
            script.onload = resolve
            script.onerror = reject
            script.async = true
            script.defer = true
            script.id = 'drip'
            script.innerHTML = innerHTML
        })
    }
}