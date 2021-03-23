export default class TrackingAPI {

  constructor(axios){
      this.axios = axios
  }

  /**
   * Subscribe to newsletter
   * @param {string} event
   * @param {object} eventData 
   */
  trackEvent(event, eventData){
      return this.axios.post(`tracking/trackEvent`, {
          event,
          eventData
      })
  }

}