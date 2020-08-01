import SiteRepository from './repository'
import SiteService from './service'

// module factory
export default function(context){

    // create repository and service, inject repo into service
    const repo = new SiteRepository(context.store)
    const service = new SiteService(repo)

    /**
     * only 1 region is supported right now, so set the region to the configured default region
     * more logic will need to be added to support multi regions
     */
    if(!context.config.intl.region) throw "A default region is required."
    service.setRegion(context.config.intl.region, context.config.intl.lang)

    return service
}