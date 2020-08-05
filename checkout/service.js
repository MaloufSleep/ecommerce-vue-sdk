export default class CheckoutService {

    constructor(repository){
        this.repository = repository
    }

    setShippingAddress(address){
        return this.repository.setShippingAddress(address)
    }

    setShippingService(service_id){
        return this.repository.setShippingService(service_id)
    }

    getShippingServices(){
        return this.repository.getShippingServices()
    }

    getPaymentServices(){
        return this.repository.getPaymentServices().map((item) => {
            return item.types.map((type) => {
                return {
                    type: type.key,
                    merchant: item.gateway?.key,
                    credentials: item.credentials?.items
                }
            })
        }).flat()
    }

    getOrder(){
        return this.repository.getOrder()
    }

}
