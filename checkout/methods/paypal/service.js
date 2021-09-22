import Dinero from 'dinero.js'
import {PaymentRequest, LineItem, ShippingMethod} from './entities/PaymentRequest'
// import { MerchantValidationError, ProcessPaymentError, ShippingAddressError } from './entities/errors'

export default class PayPalService {

    constructor(clientId, repository, environment = 'development'){
        this.repository = repository
        this.clientId = clientId
        this.environment = environment

        this._session = null
        this._callbacks = null
        this.loadScript()
    }

    /**
     * Determines if PayPal is available for use
     */
     isAvailable(){
        return Promise.resolve({
            method: 'paypal',
            available: window.paypal ? true : false
        })
    }

    /**
     * Provide callback methods to handle PayPal functionality
     */
    getHandlers(){
        return {
            fundingSource: window.paypal.FUNDING.PAYPAL,
            createOrder: this._createOrder.bind(this),
            onApprove: this._onApprove.bind(this),
            onShippingChange: this._updateShipping.bind(this),
        }
    }

    _createOrder(data, actions){
        const cart = this.repository.getCart()

        let params = { intent: 'AUTHORIZE'}

        if(cart.shipping_address){
            params.payer = {}
            if(cart.shipping_address.email) params.payer.email_address = cart.shipping_address.email
        }

        return actions.order.create()
    }

    _onApprove(data, actions){
        return actions.order.authorize().then(authorization => {
            const authorizationID = authorization.purchase_units[0].payments.authorizations[0].id
            return this.repository.process(authorizationID).then()
        })
    }

    _updateShipping(data, actions){
        return this.repository.setShippingService(data.selected_shipping_option_id).then(cart => {
            return actions.order.patch([
                {

                }
            ])
        })
    }
    

    /**
     * Loads the PayPal JS SDK
     */
    loadScript(){
        const src = 'https://www.paypal.com/sdk/js?client-id=' + this.clientId
        
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

    /**
     * Gets the total and line items (totals) for PayPal
     */
    _getProducts(){
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
}