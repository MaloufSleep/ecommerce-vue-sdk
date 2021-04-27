import isClient from '../../../../common/utils/isClient'

export default class ChargeAfter {

    constructor(publicKey, storeId = null, environment = 'development'){
        this.publicKey = publicKey
        this.storeId = storeId
        this.environment = environment

        this.loadScript()
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

    loadScript(){
        if(!isClient() || window.ChargeAfter) return Promise.resolve(true)
        const endpoint = this.environment === 'production' ? 'https://cdn.chargeafter.com/web/v1' : 'https://cdn-sandbox.ca-dev.co/web/v1'
        
        let config = { apiKey: this.publicKey }
        if(this.storeId) config.storeId = this.storeId

        return new Promise((resolve, reject) => {
            !function(e,t,c,a,n){
                var r, o = t.getElementsByTagName(c)[0];
                e.ChargeAfter || (e.ChargeAfter = {}), 
                t.getElementById(a) || (e.ChargeAfter.cfg = n,(r=t.createElement(c)).id = a, 
                r.src=`${endpoint}/chargeafter.min.js?t=`+1*new Date, 
                r.async=true, r.defer=true, r.onload=resolve, r.onerror=reject, o.parentNode.insertBefore(r,o))
            }(window,document,"script","chargeafter-checkout-finance",config)
        })
    }

    launchCheckout(params){
        if(!window.ChargeAfter?.checkout?.present) return Promise.reject('ChargeAfter not loaded.')
        return new Promise((resolve, reject) => {
            window.ChargeAfter.checkout.present(params)
            resolve(true)
        })
    }
}