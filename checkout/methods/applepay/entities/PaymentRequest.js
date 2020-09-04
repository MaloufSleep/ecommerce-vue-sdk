export class PaymentRequest {
    /**
     * Construct a new PaymentRequest
     * @param {string} countryCode 
     * @param {string} currencyCode 
     * @param {LineItem} total 
     */
    constructor(countryCode, currencyCode){
        this._countryCode = countryCode
        this._currencyCode = currencyCode
        this._supportedNetworks = ['amex','discover','masterCard','visa','jcb']
        this._merchantCapabilities = ['supports3DS']
        this._total = null
        this._lineItems = []
        this._requiredContactFields = [
            "postalAddress",
            "name",
            "phone",
            "email"
        ]
        this._shippingType = 'shipping'
        this._shippingMethods = []
    }
    
    get output(){
        return {
            countryCode: this._countryCode,
            currencyCode: this._currencyCode,
            supportedNetworks: this._supportedNetworks,
            merchantCapabilities: this._merchantCapabilities,
            total: this._total,
            lineItems: this._lineItems,
            requiredBillingContactFields: this._requiredContactFields,
            requiredShippingContactFields: this._requiredContactFields,
            shippingType: this._shippingType,
            shippingMethods: this._shippingMethods
        }
    }

    /**
     * Set the total line item
     * @param {LineItem} item 
     */
    setTotal(item){
        this._total = item
    }

    /**
     * Set a line item
     * @param {LineItem} item
     */
    setLineItem(item){
        let index = this._lineItems.findIndex(el => el.label == label)
        if(~index) this._lineItems[index] = item
        else this._lineItems.push(item)
    }

    /**
     * Set all line items
     * @param {[LineItems]} items 
     */
    setLineItems(items){
        this._lineItems = items
    }

    /**
     * Set a shipping method
     * @param {ShippingMethod} method 
     */
    setShippingMethod(method){
        let index = this._shippingMethods.findIndex(el => el.label == label)
        if(~index) this._shippingMethods[index] = method
        else this._shippingMethods.push(method)
    }

    /**
     * Set shipping methods
     * @param {[ShippingMethod]} methods
     */
    setShippingMethods(methods){
        this._shippingMethods = methods
    }
}

export class LineItem {
    /**
     * Construct a new line item
     * @param {string} label 
     * @param {string} amount 
     * @param {string=} type 
     */
    constructor(label, amount, type = 'final'){
        this.label = label
        this.amount = amount
        this.type = type
    }
}

export class ShippingMethod {
    /**
     * Construct a shipping method
     * @param {string} label 
     * @param {string} identifier 
     * @param {string} amount 
     * @param {string} detail 
     */
    constructor(label, identifier, amount, detail){
        this.label = label
        this.identifier = identifier
        this.amount = amount
        this.detail = detail
    }
}