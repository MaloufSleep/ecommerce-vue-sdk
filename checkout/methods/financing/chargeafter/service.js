import Dinero from 'dinero.js'

export default class ChargeAfterService {

    constructor(repository, chargeafter){
        this.repository = repository
        this.chargeafter = chargeafter

        this.onSuccess = null
        this.onError = null
        this.onExit = null
    }

    /**
     * Creates the consumer details object using the cart
     * @param {object} cart
     * @returns {object}
     */
    _getConsumerDetails(cart){
        let consumerDetails = {}
        if(cart?.shipping_address){
            const shippingAddress = cart.shipping_address
            consumerDetails = {
                firstName: shippingAddress.first_name,
                lastName: shippingAddress.last_name,
                email: shippingAddress.email,
                mobilePhoneNumber: shippingAddress.phone,
                shippingAddress: {
                    line1: shippingAddress.street_1,
                    line2: shippingAddress.street_2 || '',
                    city: shippingAddress.locality,
                    zipCode: shippingAddress.postcode,
                    state: shippingAddress.region
                }
            }

            // default to billing address same as shipping
            consumerDetails.billingAddress = Object.assign({}, consumerDetails.shippingAddress)
        }

        if(cart?.billing_address){
            const billingAddress = cart.billing_address
            consumerDetails.billingAddress = {
                line1: billingAddress.street_1,
                line2: billingAddress.street_2 || '',
                city: billingAddress.locality,
                zipCode: billingAddress.postcode,
                state: billingAddress.region
            }
        }

        return consumerDetails
    }

    /**
     * Called when an update to the customer's information occurs (billin/shipping address)
     * @param {object} data Data received from ChargeAfter during the checkout process
     * @param {function} callback Callback function that should be invoked if nothing is returned
     * @returns {object|void}
     */
     _onCheckoutDataUpdate(data, callback){
        console.debug('ChargeAfter callback data:', data)
        this.repository.updateShipping(data.consumerDetails).then(cart => {
            callback({
                taxAmount: Dinero({amount: cart.totals.tax}).toUnit(),
                shippingAmount: Dinero({amount: cart.totals.shipping}).toUnit(),
                totalAmount: Dinero({amount: cart.totals.total}).toUnit(),
            })
        }).catch(err => {
            console.error('Failed to update order details', err)
            callback()
        })
    }

    /**
     * Called when the checkout flow has completed, exited, or errored
     * @param {*} token a confirmation token that can be used to commit a charge
     * @param {*} data information that was collected before and during the checkout flow
     * @param {*} error an error object containing details about the failure
     * @returns {void}
     */
    _onCheckoutComplete(token, data, error){
        // handle error
        if(error){
            console.error(error)
            switch(error.code){
                case 'BACK_TO_STORE':
                case 'CONSUMER_CANCELLED': {
                    this.onExit()
                    break;
                }
                default: {
                    this.onError(error)
                    break;
                }
            }
            return
        }

        // exit if no token or data received
        if(!token || !data){
            this.onExit()
            return
        }

        const params = {
            token,
            billingAddress: data.billingAddress || data.consumerDetails?.billingAddress,
            shippingAddress: data.shippingAddress || data.consumerDetails?.shippingAddress,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            mobilePhoneNumber: data.mobilePhoneNumber,
            lender: data.lender,
            shippingAmount: data.shippingAmount,
            taxAmount: data.taxAmount,
            totalAmount: data.totalAmount,
        }

        console.debug('ChargeAfter - Checkout Successful', data, params)

        this.repository.process(params).then(response => {
            console.debug('ChargeAfter - Order Processed')
            this.onSuccess(response)
        }).catch(err => {
            this.onError(err)
        })
    }

    /**
     * Called when the application flow has completed, exited, or errored
     * @param {*} data information that was collected before and during the application flow
     * @param {*} error an error object containing details about the failure
     * @returns {void}
     */
    _onApplicationComplete(data, error){
        // handle error
        if(error){
            console.error(error)
            switch(error.code){
                case 'CONSUMER_CANCELLED': {
                    this.onExit()
                    break;
                }
                default: {
                    this.onError(error)
                    break;
                }
            }
            return
        }

        if(!data){
            this.onExit()
            return
        }

        console.debug('ChargeAfter - Application Completed', data)
        this.onSuccess(data)
    }

    /**
     * Starts the checkout process using ChargeAfter
     * https://docs.chargeafter.com/docs/present
     * @param {function} onSuccess Callback when transaction and order processed successfully
     * @param {function} onError Callback when an error has occurred
     * @param {function} onExit Callback when the user has exited/cancelled the transaction
     * @returns {void}
     */
    checkout(onSuccess, onError, onExit){
        const cart = this.repository.getCart()
        if(cart.itemCount <= 0) return Promise.reject('Cart does not contain items.')

        this.onSuccess = onSuccess
        this.onError = onError
        this.onExit = onExit

        // params to send to ChargeAfter
        let params = {
            onDataUpdate: this._onCheckoutDataUpdate.bind(this),
            callback: this._onCheckoutComplete.bind(this),
            cartDetails: {
                items: cart.getItems().map(item => {
                    return {
                        name: item.product?.name,
                        price: Dinero({amount: item.prices.active}).toUnit(),
                        sku: item.product.sku,
                        quantity: item.quantity,
                        leasable: false,
                        productCategory: item.product.properties?.Category,
                    }
                }),
                taxAmount: Dinero({amount: cart.totals.tax}).toUnit(),
                shippingAmount: Dinero({amount: cart.totals.shipping}).toUnit(),
                totalAmount: Dinero({amount: cart.totals.total}).toUnit(),
            }
        }

        let consumerDetails = this._getConsumerDetails(cart)
        if(consumerDetails && Object.keys(consumerDetails).length) params.consumerDetails = consumerDetails

        if(cart?.promotions?.length){
            params.cartDetails.discounts = cart.promotions.map(promotion => {
                return {
                    amount: Dinero({amount: promotion.discount}).toUnit(),
                    name: promotion?.promotion?.name
                }
            })
        }

        this.chargeafter.launchCheckout(params)
    }

    /**
     * Starts the application process using ChargeAfter
     * https://docs.chargeafter.com/docs/add-an-application-button
     * @param {function} onSuccess Callback when application processed successfully
     * @param {function} onError Callback when an error has occurred
     * @param {function} onExit Callback when the user has exited/cancelled the application process
     * @returns {void}
     */
    apply(onSuccess, onError, onExit){
        const cart = this.repository.getCart()

        this.onSuccess = onSuccess
        this.onError = onError
        this.onExit = onExit

        let params = {
            callback: this._onApplicationComplete.bind(this)
        }

        let consumerDetails = this._getConsumerDetails(cart)
        if(consumerDetails && Object.keys(consumerDetails).length) params.consumerDetails = consumerDetails

        this.chargeafter.launchApplication(params)
    }

    /**
     * Updates the prices for the promotional widget
     */
    updateWidgetPrices(items = []){
        return this.chargeafter.updateWidgetPrices(items)
    }
    
}
