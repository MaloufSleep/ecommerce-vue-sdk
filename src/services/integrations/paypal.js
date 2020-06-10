
export class PaypalService {

    #api
    #store
    #clientId

    constructor(api, store, config){
        this.#api = api
        this.#store = store
        this.#clientId = config.clientId
        this.loaded = false
    }

    get clientId(){
        return this.#clientId
    }

    createOrder(data, actions){
        return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    value: 1.00,
                    currency_code: 'USD'
                }
            }]
        })
    }

    onApprove(data, actions){
        console.log(data)
        return actions.order.capture()
    }

    onShippingChange(data, actions){
        console.log(data)
        console.log(actions)
        return actions.reject()
    }

}
