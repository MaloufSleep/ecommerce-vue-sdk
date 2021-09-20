import Dinero from 'dinero.js'
import {PaymentRequest, LineItem, ShippingMethod} from './entities/PaymentRequest'
// import { MerchantValidationError, ProcessPaymentError, ShippingAddressError } from './entities/errors'

export default class PayPalService {

    constructor(repository, environment = 'development'){
        this.repository = repository
        this.environment = environment
        this._session = null
        this._callbacks = null
    }

    /**
     * Determines if Apple Pay is available for use
     */
    isAvailable(){
        const ret = {
            method: 'paypal',
            available: true
        }

        if(window.paypal){
            return new Promise((resolve, reject) => {
                window.setTimeout(() => {
                    resolve(ret)
                }, 50)
            })
        }else{
            return Promise.resolve(ret)
        }
    }

    verify() {
        console.log('VERIFY service.js')
        this.repository.verify()
    }

    /**
     * Starts an Apple Pay payment session
     * @param {function} onSuccess Callback when the transaction succeeds 
     * @param {function} onError Callback when there is an error with the transaction
     * @param {function} onCancel Callback when the transaction is cancelled
     */
    startSession(onSuccess, onError, onCancel){
        this._callbacks = {
            onSuccess,
            onError,
            onCancel
        }

        const cart = this.repository.getCart()
        const region = this.repository.getRegion()

        console.log('cart service', cart)
        console.log('region service', region)

        if(!cart) throw "PayPal: cart undefined"
        if(!region) throw "PayPal: region undefined"

        const paymentRequest = new PaymentRequest(
            region.country.alpha_code,
            region.currency.alpha_code
        )

        const {total, items} = this._getLineItems()
        
        paymentRequest.setTotal(total)
        paymentRequest.setLineItems(items)
        paymentRequest.setShippingMethods(this._getShippingMethods())

        console.log('payRequest', paymentRequest)

        this._session = window.paypal

        console.log('buttons', this._session)
    }

    /**
     * Gets the total and line items (totals) for PayPal
     */
    _getLineItems(){
        const cart = this.repository.getCart()
        const region = this.repository.getRegion()

        const total = new LineItem(region.site.name, Dinero({amount: cart.total}).toFormat('0.00'))
        const items = []

        items.push(new LineItem('Subtotal', Dinero({amount: cart.totals.subtotal}).toFormat('0.00')))
        if(cart.totals.discount > 0) items.push(new LineItem('Discounts', Dinero({amount: cart.totals.discount}).toFormat('-0.00')))
        items.push(new LineItem('Shipping', Dinero({amount: cart.totals.shipping}).toFormat('0.00')))
        items.push(new LineItem('Tax', Dinero({amount: cart.totals.tax}).toFormat('0.00')))
        if(cart.totals.fees > 0) items.push(new LineItem('Fees', Dinero({amount: cart.totals.fees}).toFormat('0.00')))
        
        return { total, items }
    }

    /**
     * Retreives shipping methods for site and formats for Apple Pay
     */
    _getShippingMethods(){
        const cart = this.repository.getCart()
        const region = this.repository.getRegion()
        const methods = []

        // The first shipping method will be the 'pre-selected' option on the Apple Pay payment sheet.
        // This is checking if the cart has a shipping service applied and moving it to the first element of the array.
        if(cart.shipping_service){
            region.shipping_services.sort((a,b) => {
                return a.id == cart.shipping_service.id ? -1 : b.id == cart.shipping_service.id ? 1 : 0
            })
        }

        region.shipping_services.forEach(service => {
            methods.push(
                new ShippingMethod(
                    service.id,
                    service.name,
                    service.type,
                    service.default == 0 ? false : true,
                    Dinero({amount: service.price}).toFormat('0.00'),
                    region.currency.alpha_code 
                )
            )
        })
        return methods
    }

    // /**
    //  * Build Apple Pay errors based on responses
    //  * @param {*} response
    //  */
    // _getErrorsForResponse(response){
    //     return [
    //         new window.ApplePayError('unknown')
    //     ]
    // }

    /**
     * Apple Pay session callback for handling the merchant validation step
     * @param {ApplePayValidateMerchantEvent} event 
     */
    _onValidateMerchant(event){
        this.repository.verify(event.validationURL)
        .then(data => {
            if(data.session_object){
                return this._session.completeMerchantValidation(data.session_object)
            }
            this._session.abort()
            this._callbacks.onError(new MerchantValidationError('Merchant validation successful, session object missing', data))
        }).catch(error => {
            this._session.abort()
            this._callbacks.onError(new MerchantValidationError('Merchant validation failed', error))
        })
    }

    /**
     * Apple Pay session callback for handling when the shipping address has updated
     * @param {object} event 
     */
    _onShippingContactSelected(event){
        // this event contains redacted address data only
        const contact = event.shippingContact
        const address = {
            locality: contact.locality,
            region: contact.administrativeArea,
            postcode: contact.postalCode,
            country: contact.countryCode
        }

        this.repository.setShippingAddress(address)
        .then(res => {
            const {total, items} = this._getLineItems()
            this._session.completeShippingContactSelection({
                newShippingMethods: this._getShippingMethods(),
                newTotal: total, 
                newLineItems: items 
            })
        }).catch(error => {
            const {total, items} = this._getLineItems()
            this._session.completeShippingContactSelection({
                errors: this._getErrorsForResponse(error),
                newShippingMethods: this._getShippingMethods(),
                newTotal: total, 
                newLineItems: items 
            })
            this._callbacks.onError(new ShippingAddressError('Failed to set shipping address', error))
        })
    }

    /**
     * Apple Pay session callback for handling when the shipping method has been updated
     * @param {object} event 
     */
    _onShippingMethodSelected(event){
        const method = event.shippingMethod
        this.repository.setShippingService(method.identifier)
        .then(res => {
            const {total, items} = this._getLineItems()
            this._session.completeShippingMethodSelection({
                newTotal: total,
                newLineItems: items
            })
        })
    }

    /**
     * Apple Pay session callback for handling when the payment has been authorized
     * @param {object} event 
     */
    _onPaymentAuthorized(event){
        const payment = event.payment
        payment.token.paymentData = JSON.stringify(payment.token.paymentData)
        this.repository.process(payment.token, payment.billingContact, payment.shippingContact)
        .then(res => {
            this._session.completePayment({
                status: window.ApplePaySession.STATUS_SUCCESS,
            })
            this._callbacks.onSuccess(res.order)
        }).catch(error => {
            this._session.completePayment({
                status: window.ApplePaySession.STATUS_FAILURE,
                errors: this._getErrorsForResponse(error)
            })
            this._callbacks.onError(new ProcessPaymentError('Failed to process payment', error))
        })
    }

    /**
     * Apple Pay session callback is invoked when a user cancels the transaction or on timout of a previous step
     */
    _onCancel(){
        this._callbacks.onCancel()
    }
}