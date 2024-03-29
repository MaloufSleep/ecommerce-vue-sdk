import Api from './api'
import Repository from './repository'
import Service from './service'

export default function(context){
    
    const api = new Api(context.api)
    const repository = new Repository(context.store, api)
    const service = new Service(repository)

    return service
}