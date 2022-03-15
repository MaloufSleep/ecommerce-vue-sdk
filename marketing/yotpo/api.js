export default class YotpoAPI {

    constructor(axios) {
        this.axios = axios
    }

    /**
   * Track website event
   * @param {string} event
   * @param {object} eventData 
   */
    trackEvent(event, eventData) {
        return this.axios.post(`marketing/yotpo/trackEvent`, {
            event,
            eventData
        })
    }
}