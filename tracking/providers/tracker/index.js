import isClient from '../../../common/utils/isClient'

export default class SiteTracker {
  constructor (context, trackerConfig) {
    this.context = context
    this.type = trackerConfig.type
    this.name = trackerConfig.name
  }

  optIn () {
    if(!isClient()) return Promise.resolve(true)

    return Promise.resolve(true)
  }

  optOut () {
    if(!isClient()) return Promise.resolve(true)

    return Promise.resolve(true)
  }
}