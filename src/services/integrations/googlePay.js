
export class GooglePayService {

    #api
    #store

    #ready = false
    #baseRequest
    #tokenizationSpecification
    #allowedCardNetworks
    #allowedCardAuthMethods
    #baseCardPaymentMethod
    #cardPaymentMethod
    #paymentsClient

    constructor(api, store, config){
        this.#api = api
        this.#store = store

        this.#baseRequest = {
            apiVersion: 2,
            apiVersionMinor: 0
        }

        this.#tokenizationSpecification = {
            type: 'PAYMENT_GATEWAY',
            parameters: {
                gateway: config.gateway || 'authorizenet',
                gatewayMerchantId: config.merchantId
            }
        }

        this.#allowedCardNetworks = ['AMEX','DISCOVER','JCB','MASTERCARD','VISA']
        this.#allowedCardAuthMethods = ['PAN_ONLY','CRYPTOGRAM_3DS']

        this.#baseCardPaymentMethod = {
            type: 'CARD',
            parameters: {
                allowedAuthMethods: this.#allowedCardAuthMethods,
                allowedCardNetworks: this.#allowedCardNetworks
            }
        }

        this.#cardPaymentMethod = Object.assign({
            tokenizationSpecification: this.#tokenizationSpecification
        }, this.#baseCardPaymentMethod)
    }

    get ready(){
        return this.#ready
    }

    initializePaymentsClient(){
        if(!window.google){throw "GooglePayService: Google Pay not loaded"}
        this.#paymentsClient = new window.google.payments.api.PaymentsClient({environment: 'TEST'})
        this.#ready = true
    }

    isReadyToPay(){
        const isReadyToPayRequest = Object.assign({}, this.#baseRequest)
        isReadyToPayRequest.allowedPaymentMethods = [this.#baseCardPaymentMethod]
        return this.#paymentsClient.isReadyToPay(isReadyToPayRequest)
    }

    createButton(params){
        return this.#paymentsClient.createButton(params)
    }

}