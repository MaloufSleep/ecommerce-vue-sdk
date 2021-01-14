import Api from './api'
import Service from './service'

// module factory
export default function(context){
    
    // construct product module objects
    const api = new Api(context.api)
    const service = new Service(api)

    context.products = service
}