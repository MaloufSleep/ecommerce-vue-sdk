export default class CheckoutService {

    constructor(repository){
        this.repository = repository
    }

    setShippingAddress(address, subscribe = false, subscribeSms = false){
        return this.repository.setShippingAddress(address, subscribe, subscribeSms)
    }

    setShippingService(service_id){
        return this.repository.setShippingService(service_id)
    }

    getShippingServices(){
        return this.repository.getShippingServices()
    }

    getPaymentServices(){
        return this.repository.getPaymentServices().map(item => {
            return item.types.map(type => {
                return {
                    type: type.key,
                    merchant: item.gateway?.key,
                    credentials: item.credentials?.items
                }
            })
        }).flat()
    }

    expressCheckoutAvailable(){
        return Promise.all([
            this.applePay?.isAvailable()
        ]).then(methods => {
            return methods.filter(method => method.available).map(method => method.method)
        })
    }

    getOrder(){
        return this.repository.getOrder()
    }

}
