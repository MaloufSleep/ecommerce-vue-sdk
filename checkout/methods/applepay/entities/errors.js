
class ApplePayError {
    /**
     * @param {int} code 
     * @param {string} message 
     */
    constructor(code, type, message){
        this.code = code
        this.type = type
        this.message = 'Apple Pay: ' + message
        this.data = null
    }
}

export class MerchantValidationError extends ApplePayError {
    constructor(message, data = null){
        super(100, 'Merchant Validation Error', message)
        this.data = data
    }
}

export class ProcessPaymentError extends ApplePayError {
    constructor(message, data = null){
        super(500, 'Processing Error', message)
        this.data = data
    }
}