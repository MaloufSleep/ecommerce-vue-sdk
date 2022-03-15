import StoresAPI from './api'
import StoresService from './service'

// module factory
export default function(context){

    // create api and service, inject api into service
    const api = new StoresAPI(context.api)
    const service = new StoresService(api)

    context.stores = service
}