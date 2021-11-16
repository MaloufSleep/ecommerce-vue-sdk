import isClient from '../../../../common/utils/isClient'

export default class SetPay {

    constructor(partnerId, merchantId, environment){
        this.partnerId = partnerId
        this.merchantId = merchantId
        this.environment = environment
    }

    static fromPaymentService(service, environment = 'development'){
        const partnerId = service.credentials?.find(item => item.type?.key == 'setpay-partner-id')?.value
        const merchantId = service.credentials?.find(item => item.type?.key == 'setpay-merchant-id')?.value

        if(!partnerId || !merchantId){
            console.error("Synchrony SetPay credentials missing or undefined")
            return null
        }

        return new SetPay(partnerId, merchantId, environment)
    }

    loadScript(amount){
        if(!isClient()) return Promise.resolve(true)
        const src = this.environment === 'production' ? '' : `https://qbnpl.syf.com/widget/syf-widget-loader.js?partnerId=${this.partnerId}&purchaseAmount=${amount}`
        
        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            document.body.appendChild(script)
            script.onload = resolve
            script.onerror = reject
            script.src = src
        })
    }

    launchModal(params, process){
        params.processInd = process
        params.partnerId = this.partnerId
        return new Promise((resolve, reject) => {
            window.syfDBuy.calldBuyProcess(null, params)
            resolve(true)
        })
    }

}
