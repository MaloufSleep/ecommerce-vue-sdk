
export class AuthorizeNetService {

    #api
    #store

    #authData

    constructor(api, store, config){
        this.#api = api
        this.#store = store

        this.#authData = {
            clientKey: config.clientKey,
            apiLoginID: config.apiLoginId
        }
    }

    sendPaymentData(data, type){
        if(!window.Accept) throw "Accept.js is not available for use"

        let params = {}
        params.authData = this.#authData
        if(type === 'card') params.cardData = data
        else if(type === 'bank') params.bankData = data

        return new Promise((resolve, reject) => {
            window.Accept.dispatchData(params, (res) => {
                if(res.messages.resultCode === 'Error'){
                    reject(res)
                }else{
                    resolve(res)
                }
            })
        })
    }

    sendCardPaymentData(cardData){
        return this.sendPaymentData(cardData, 'card')
    }

    sendBankPaymentData(bankData){
        return this.sendPaymentData(bankData, 'bank')
    }

}