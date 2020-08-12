import isClient from '../../../../common/utils/isClient'

export default class Synchrony {

    constructor(merchantId){
        this.merchantId = merchantId
        this.loadScript()
    }

    static fromPaymentService(service){
        const merchantId = service.credentials?.find(item => item.type?.key == 'merchant-id')?.value
        if(!merchantId){
            console.error("Synchrony credentials missing or undefined")
            return null
        }
        return new Synchrony(merchantId)
    }

    loadScript(){
        if(!isClient() || window.syfDBuy) return Promise.resolve(true)
        const src = process.env.PAYMENT_ENV === 'production' ? 'https://buy.syf.com/digitalbuy/js/merchant_ff.js' : 'https://ubuy.syf.com/digitalbuy/js/merchant_ff.js'
        
        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            document.body.appendChild(script)
            script.onload = resolve
            script.onerror = reject
            script.async = true
            script.defer = true
            script.src = src
        })
    }

    launchModal(params, process){
        params.processInd = process
        params.merchantID = this.merchantId
        return new Promise((resolve, reject) => {
            window.syfDBuy.calldBuyProcess(null, params)
            resolve(true)
        })
    }

}
