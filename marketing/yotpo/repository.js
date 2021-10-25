export default class NewsletterRepository {

    constructor(store, reviewsConfig, api){
        this.store = store
        this.reviewsConfig = reviewsConfig
        this.api = api
    }

    getAppKey() {
        return this.reviewsConfig.appKey
    }

    trackEvent (event, eventData){
        return this.api.trackEvent(event, eventData)
    }

}