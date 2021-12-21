import Api from './api'
import Repository from './repository'
import Service from './service'

export default function(context){

    console.log("yotpo index", context.config)

    if(!context.config.reviewsConfig) return
    
    const api = new Api(context.api)
    const repository = new Repository(context.store, context.site.repository, context.config.reviewsConfig, api)
    const service = new Service(repository)

    return service
}