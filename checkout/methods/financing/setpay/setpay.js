import isClient from '../../../../common/utils/isClient'

export default class SetPay {

    constructor(partnerId, merchantId, environment){
        this.partnerId = partnerId
        this.merchantId = merchantId
        this.environment = environment
    }

    static fromPaymentService(service, setpayConfig, environment = 'development'){
        const partnerId = setpayConfig ? setpayConfig?.partnerId : null
        const merchantId = setpayConfig ? setpayConfig?.merchantId : null

        console.log(partnerId, merchantId)

        if(!partnerId || !merchantId){
            console.error("Synchrony SetPay credentials missing or undefined")
            return null
        }

        return new SetPay(partnerId, merchantId, environment)
    }

    loadScript(amount){
        console.log('load script', amount);
        if(!isClient()) return Promise.resolve(true)
        console.log('Is client load script')
        const src = this.environment === 'production' ? '' : `https://bnpl.syf.com/widget/syf-widget-loader.js?partnerId=${this.partnerId}&purchaseAmount=${amount}`
        console.log('source', src)
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
}
