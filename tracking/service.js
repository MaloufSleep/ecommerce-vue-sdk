export default class TrackingService {

  constructor(repository){
    this.repository = repository
  }

  trackEvent(event, eventData){
    return this.repository.trackEvent(event, eventData)
  }

  getCookieAccept () {
    return this.repository.getCookieAccept()
  }

  setCookieAccept(accept) {
    return this.repository.setCookieAccept(accept)
  }

  optIn () {
    return this.repository.optIn()
  }

  getTrackingService (type) {
    return this.repository.getTrackingServices().filter(tracker => tracker.type === type)
  }

}