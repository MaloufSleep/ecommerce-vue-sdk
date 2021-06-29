import TrackerFactory from './factory'

export default class TrackingRepository {

  constructor (api, context, cartRepository, checkoutRepository, trackerConfigs){
      this.api = api
      this.context = context
      this.cartRepository = cartRepository
      this.cart = cartRepository.get()
      this.order = checkoutRepository.getOrder()
      this.trackerConfigs = trackerConfigs || []
  }

  configureTrackers() {
    const instantiated = []
    this.trackerConfigs.forEach(trackerConfig => {
        const trackerInstance = TrackerFactory(this.context, trackerConfig)
        instantiated.push(trackerInstance)
    })

    this.trackers = instantiated
  }

  getCookieAccept () {
    let accept

    if (localStorage) {
      accept = localStorage.getItem('ec-cookie-accept')
    }
    return accept
  }

  setCookieAccept(accept = 'accept') {
    if (localStorage){
      localStorage.setItem('ec-cookie-accept', accept)
    }
  }

  optIn () {
    this.trackers.forEach(tracker => {
      tracker.optIn()
    })
  }

  optOut () {
    this.trackers.forEach(tracker => {
      tracker.optOut()
    })
  }

  getTrackingServices (type) {
    return this.trackers
  }

  trackEvent (event, eventData){
    return this.api.trackEvent(event, eventData)
  }
}