export default class TrackingService {

  constructor(api){
    this.api = api
  }

  trackEvent(event, eventData){
      return this.api.trackEvent(event, eventData)
  }

}