import isClient from '../../../../common/utils/isClient'

export default class SetPay {

    constructor(merchantId, environment){
        this.merchantId = merchantId
        this.environment = environment

        this.loadScript()
    }

    static fromPaymentService(service, environment = 'development'){
        const merchantId = service.credentials?.find(item => item.type?.key == 'merchant-id')?.value
        if(!merchantId){
            console.error("Synchrony SetPay credentials missing or undefined")
            return null
        }
        return new SetPay(merchantId, environment)
    }

    loadScript(){
        if(!isClient() || window.syfDBuy) return Promise.resolve(true)
        const src = this.environment === 'production' ? 'https://buy.syf.com/digitalbuy/js/merchant_ff.js' : 'https://ubuy.syf.com/digitalbuy/js/merchant_ff.js'
        
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
