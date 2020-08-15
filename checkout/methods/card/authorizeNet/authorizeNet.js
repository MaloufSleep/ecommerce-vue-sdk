import isClient from '../../../../common/utils/isClient'

export default class AuthorizeNet {

    constructor(merchantId, publicKey, environment){
        this.merchantId = merchantId
        this.publicKey = publicKey
        this.environment = environment

        this.loadScript()
    }

    static fromPaymentService(service, environment = 'development'){
        const merchantId = service.credentials?.find(item => item.type?.key == 'merchant-id')?.value
        const publicKey = service.credentials?.find(item => item.type?.key == 'merchant-public-key')?.value

        if(!merchantId || !publicKey) {
            console.error("AuthNet credentials missing or undefined")
            return null
        }

        return new AuthorizeNet(merchantId, publicKey, environment)
    }

    loadScript(){
        if(!isClient() || window.Accept) return Promise.resolve(true)
        const src = this.environment === 'production' ? 'https://js.authorize.net/v1/Accept.js' : 'https://jstest.authorize.net/v1/Accept.js'
        
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

    dispatch(params){
        if(!window.Accept) Promise.reject('Accept.js not available')
        return new Promise((resolve, reject) => {
            window.Accept.dispatchData(params, (response) => {
                if(response.messages?.resultCode === 'Ok') resolve({
                    result: response.messages?.resultCode,
                    message: response.messages?.message?.[0],
                    descriptor: response.opaqueData?.dataDescriptor,
                    nonce: response.opaqueData?.dataValue
                })
                else reject({
                    result: response.messages?.resultCode,
                    message: response.messages?.message?.[0]
                })
            })
        })
    }

    getNonceForCard(number, expMonth, expYear, securityCode, name = ''){
        const params = {
            authData: {
                apiLoginID: this.merchantId,
                clientKey: this.publicKey
            },
            cardData: {
                cardNumber: number,
                month: expMonth,
                year: expYear,
                cardCode: securityCode,
                fullName: name
            }
        }
        return this.dispatch(params)
    }

    getNonceForBank(accountNumber, routingNumber, name, type){
        if(['checking','savings','businessChecking'].includes(type)) Promise.reject(`Type must be 'checking', 'savings', or 'businessChecking'.`)
        
        const params = {
            authData: {
                apiLoginID: this.merchantId,
                clientKey: this.publicKey
            },
            bankData: {
                accountNumber,
                routingNumber,
                nameOnAccount: name,
                accountType: type,
            }
        }
        return this.dispatch(params)
    }

}
