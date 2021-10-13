import Dinero from 'dinero.js'
import { exception } from 'vue-gtag'
import isClient from '../../../common/utils/isClient'

// import { MerchantValidationError, ProcessPaymentError, ShippingAddressError } from './entities/errors'

export default class PayPalService {

    constructor(clientId, repository, environment = 'development'){
        this.repository = repository
        this.clientId = clientId
        this.environment = environment

        this._callbacks = null
        this.loadScript()
    }

    /**
     * Loads the PayPal JS SDK
     */
     loadScript(){
        if(!isClient() || window.paypal) return Promise.resolve(true)
        const src = `https://www.paypal.com/sdk/js?client-id=${this.clientId}&intent=authorize`
        
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
     * Determines if PayPal is available for use
     */
    isAvailable(){
        return Promise.resolve({
            method: 'paypal',
            available: window.paypal ? true : false
        })
    }

    /**
     * Creates and renders a PayPal button
     */
    renderButton(selector, callbacks, options = null){
        if(!window.paypal) throw "PayPal not available."

        let style = {
            layout: 'vertical',
            color:  'blue',
            shape:  'rect',
            label:  'paypal'
        }

        this._callbacks = {
            onCancel: callbacks.onCancel,
            onClick: callbacks.onClick,
            onError: callbacks.onError,
            onSuccess: callbacks.onSuccess
        }
        
        window.paypal.Buttons({
            fundingSource: options.fundingSource || window.paypal.FUNDING.PAYPAL,
            style: options.style || style,
            createOrder: this._createOrder.bind(this),
            onApprove: this._onApprove.bind(this),
            onShippingChange: this._updateShipping.bind(this),
            onCancel: this._onCancel.bind(this),
            onClick: this._onClick.bind(this),
            onError: this._onError.bind(this)
        }).render(selector);
    }

    _createOrder(data, actions){
        const cart = this.repository.getCart()
        const region = this.repository.getRegion()
        const address = cart.shipping_address

        let params = { intent: 'AUTHORIZE'}

        params.application_context = {
            shipping_preference: 'GET_FROM_FILE',
            user_action: 'CONTINUE'
        }

        params.purchase_units = [
            {
                amount: this._formatAmount(cart),
                items: cart.items.active.map(item => {return this._formatPurchaseUnits(item)}),
                shipping: {
                    options: this._getShippingMethods()
                }
            }
        ]

        if(address){
            params.payer = {
                email_address: address.email,
                given_name:address.first_name,
                surname: address.last_name,
                address: this._formatAddress(address)
            }

            params.purchase_units[0].shipping.name = { full_name: address.name }
            params.purchase_units[0].shipping.address = this._formatAddress(cart.shipping_address)
        }

        return actions.order.create(params)
    }

    _formatAmount(cart) {
        return {
            currency_code: 'USD',
            value: Dinero({amount: cart.totals.total}).toFormat('0.00'),
            breakdown: {
                item_total: this._formatValue(cart.totals.subtotal), 
                shipping: this._formatValue(cart.totals.shipping),
                handling: this._formatValue(cart.totals.fees),
                tax_total: this._formatValue(cart.totals.tax), 
                discount: this._formatValue(cart.totals.discount), 
            } 
        }
    }

    _shippingDiscount(cart) {
        var discount = 0

        cart.promotions.map(promo => {
            if(promo.shippingDiscount > 0) {
                discount += promo.shippingDiscount
            }
        })

        return discount
    }

    _formatAddress(address) {
        return {
            address_line_1: address.street_1,
            address_line_2: address.street_2,
            admin_area_1: address.region,
            admin_area_2: address.locality,
            postal_code: address.postcode,
            country_code: address.country
        }
    }

    _formatPurchaseUnits(item) {
        return {
            name: item.product.name,
            unit_amount: this._formatValue(item.prices.active),
            quantity: item.quantity,
            sku: item.product.sku,
            category: item.product.properties.category
        }
    }

    _formatValue(value) {
        return {
            currency_code: 'USD',
            value: Dinero({amount: value}).toFormat('0.00')
        }
    }

    _onApprove(data, actions){
        return actions.order.authorize().then(authorization => {
            const authorizationID = authorization.purchase_units[0].payments.authorizations[0].id
            return this.repository.process(data.orderID, authorizationID).then(data => {
                this._onSuccess()
            })
        })
    }

    _updateShipping(data, actions){
        const contact = data.shipping_address
        const address = {
            locality: contact.city,
            region: contact.state,
            postcode: contact.postal_code,
            country: contact.country_code
        }

        return this.repository.setShippingAddress(address, data.selected_shipping_option.id).then(cart => {
            // Make changes to patch in
            const amount = this._formatAmount(cart)

            return actions.order.patch([
                {
                    op: 'replace',
                    path: '/purchase_units/@reference_id==\'default\'/amount',
                    value: amount,
                },
            ])
        }).catch(err => {
            console.log("ERROR: ", err)
        })
    }

    _onClick(){
        if(this._callbacks.onClick) this._callbacks.onClick()
    }

    _onCancel(){
        if(this._callbacks.onCancel) this._callbacks.onCancel()
    }

    _onError(error){
        if(this._callbacks.onError) this._callbacks.onError()
    }

    _onSuccess(){
        if(this._callbacks.onSuccess) this._callbacks.onSuccess()
    }

    /**
     * Retreives shipping methods for site and formats for Apple Pay
     */
    _getShippingMethods(){
        const cart = this.repository.getCart()
        const region = this.repository.getRegion()
        const methods = []

        // This is checking if the cart has a shipping service applied and moving it to the first element of the array.
        if(cart.shipping_service){
            region.shipping_services.sort((a,b) => {
                return a.id == cart.shipping_service.id ? -1 : b.id == cart.shipping_service.id ? 1 : 0
            })
        }

        region.shipping_services.forEach(service => {
            var amount = (service.price > 0) ? (service.price - this._shippingDiscount(cart)) : service.price

            methods.push({
                id: service.id,
                label: service.name,
                type: 'SHIPPING',
                selected: cart.shipping_service.id == service.id ? true : false,
                amount: this._formatValue(amount)
            })
        })
        return methods
    }
}