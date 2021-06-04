import Api from './api'
import Repository from './repository'
import Service from './service'
import TrackerFactory from './factory'

import * as Components from './ui/components'

// module factory
export default function(context){

    const api = new Api(context.api)
    const repository = new Repository(api, context, context.cart.repository, context.checkout.repository, context.config.trackerConfig)
    const service = new Service(repository)

    // register components
    Object.values(Components).forEach(component => {
        context.Vue.use(component)
    })

    context.tracking = service

    // Instantiate trackers
    repository.configureTrackers()
}