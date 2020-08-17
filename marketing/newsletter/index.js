import Api from './api'
import Service from './service'

export default function(context){
    
    const api = new Api(context.api)
    const service = new Service(api)

    return service
}