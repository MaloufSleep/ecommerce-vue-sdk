import Dinero from 'dinero.js'

export default class ChargeAfterService {

    constructor(repository, chargeafter){
        this.repository = repository
        this.chargeafter = chargeafter
        this.onSuccess = null
        this.onError = null
        this.onExit = null
        this.shouldUpdateShipping = false
    }

    /**
     * Starts the checkout process using ChargeAfter
     * @param {function} onSuccess Callback when transaction and order processed successfully
     * @param {function} onError Callback when an error has occurred
     * @param {function} onExit Callback when the user has exited/cancelled the transaction
     * @param {boolean} shouldUpdateShipping Indicates if the order should be updated with the shipping address received from ChargeAfter
     * @returns {void}
     */
    checkout(onSuccess, onError, onExit, shouldUpdateShipping = false){
        const cart = this.repository.getCart()
        if(cart.itemCount <= 0) return Promise.reject('Cart does not contain items.')

        this.onSuccess = onSuccess
        this.onError = onError
        this.onExit = onExit
        this.shouldUpdateShipping = shouldUpdateShipping

        // params to send to ChargeAfter
        let params = {
            onDataUpdate: this.onDataUpdate.bind(this),
            callback: this.onComplete.bind(this),
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

        if(cart?.shipping_address){
            const shippingAddress = cart.shipping_address
            params.consumerDetails = {
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
            params.consumerDetails.billingAddress = Object.assign({}, params.consumerDetails.shippingAddress)
        }

        if(cart?.billing_address){
            const billingAddress = cart.billing_address
            params.consumerDetails.billingAddress = {
                line1: billingAddress.street_1,
                line2: billingAddress.street_2 || '',
                city: billingAddress.locality,
                zipCode: billingAddress.postcode,
                state: billingAddress.region
            }
        }

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
     * Called when an update to the customer's information occurs (billin/shipping address)
     * @param {object} data Data received from ChargeAfter during the checkout process
     * @param {function} callback Callback function that should be invoked if nothing is returned
     * @returns {object|void}
     */
    onDataUpdate(data, callback){
        console.debug('ChargeAfter callback data:', data)
        if(this.shouldUpdateShipping){
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
        }else{
            return {}
        }
    }

    onComplete(token, data, error){
        // handle error
        if(error){
            console.log(error)
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

        console.debug('ChargeAfter - Success: ', data, params)

        this.repository.process(params).then(response => {
            console.debug('ChargeAfter - Order Processed')
            this.onSuccess(response)
        }).catch(err => {
            this.onError(err)
        })
    }
}
