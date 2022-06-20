import isClient from '../../../../common/utils/isClient'

export default class ChargeAfter {

    constructor(publicKey, storeId = null, environment = 'development'){
        this.publicKey = publicKey
        this.storeId = storeId
        this.environment = environment

        this.scriptLoaded = false
        this.widgetScriptLoaded = false

        this.loadScript().then(() => {
            this.scriptLoaded = true
        })
        setTimeout(() => {
            this.loadWidgetScript().then(() => {
                this.widgetScriptLoaded = true
            })
        }, 500);
    }

    static fromPaymentService(service, environment = 'development'){
        const publicKey = service.credentials?.find(item => item.type?.key == 'merchant-public-key')?.value
        const storeId = service.credentials?.find(item => item.type?.key == 'store-id')?.value

        if(!publicKey){
            console.error("ChargeAfter credentials missing or undefined")
            return null
        }

        return new ChargeAfter(publicKey, storeId, environment)
    }

    setConfig(){
        if(!window.caConfig){
            window.caConfig = { apiKey: this.publicKey }
            if(this.storeId) window.caConfig.storeId = this.storeId
        }
    }

    loadScript(){
        if(!isClient() || window.ChargeAfter) return Promise.resolve(true)
        this.setConfig()

        const endpoint = this.environment === 'production' ? 'https://cdn.chargeafter.com/web/v2' : 'https://cdn-sandbox.ca-dev.co/web/v2'
        return new Promise((resolve, reject) => {
            !function(e,t,c,a,n){
                var r, o = t.getElementsByTagName(c)[0];
                e.ChargeAfter || (e.ChargeAfter = {}), 
                t.getElementById(a) || (e.ChargeAfter.cfg = n,(r=t.createElement(c)).id = a, 
                r.src=`${endpoint}/chargeafter.min.js?t=`+1*new Date, 
                r.async=true, r.defer=true, r.onload=resolve, r.onerror=reject, o.parentNode.insertBefore(r,o))
            }(window,document,"script","chargeafter-checkout-finance",window.caConfig)
        })
    }

    loadWidgetScript(){
        if(!isClient()) return Promise.resolve(true)
        this.setConfig()

        const endpoint = this.environment === 'production' ? 'https://cdn.chargeafter.com/promotional-widget/v2' : 'https://cdn-sandbox.ca-dev.co/promotional-widget/v2'
        return new Promise((resolve, reject) => {
            !function(e,t,c,a,n){
                var r,o=t.getElementsByTagName(c)[0];
                e.ChargeAfter || (e.ChargeAfter = {}),
                t.getElementById(a)||(e.ChargeAfter.cfg = n,(r=t.createElement(c)).id=a,
                r.src=`${endpoint}/widget.min.js?t=`+1*new Date,
                r.async=true,r.defer=true,r.onload=resolve,r.onerror=reject,o.parentNode.insertBefore(r,o))
            }(window,document,"script","chargeafter-promotional-widget",window.caConfig)
        })
    }

    launchCheckout(params){
        if(!window.ChargeAfter?.checkout?.present) return Promise.reject('ChargeAfter not loaded.')
        return new Promise((resolve, reject) => {
            window.ChargeAfter.checkout.present(params)
            resolve(true)
        })
    }

    launchApplication(params){
        if(!window.ChargeAfter?.apply?.present) return Promise.reject('ChargeAfter not loaded.')
        return new Promise((resolve, reject) => {
            window.ChargeAfter.apply.present(params)
            resolve(true)
        })
    }

    updateWidgetPrices(items){
        if(!window.ChargeAfter?.promotionalWidget?.update) return Promise.reject('ChargeAfter widget not loaded.')
        return new Promise((resolve, reject) => {
            window.ChargeAfter.promotionalWidget.update({ items })
            resolve(true)
        })
    }
}