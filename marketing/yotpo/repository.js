export default class YotpoRepository {

    constructor(store, siteRepository, reviewsConfig, api){
        this.store = store
        this.siteRepository = siteRepository;
        this.reviewsConfig = reviewsConfig
        this.api = api
    }

    getAppKey() {
        return this.reviewsConfig.appKey
    }

    trackEvent (event, eventData){
        const regionCustomerId = this.siteRepository.getRegion().customer.id
        eventData.regionCustomerId = regionCustomerId
        return this.api.trackEvent(event, eventData)
    }

}