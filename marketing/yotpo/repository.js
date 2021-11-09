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
        console.log('region id', regionCustomerId)
        eventData.regionCustomerId = regionCustomerId
        console.log(eventData);
        return this.api.trackEvent(event, eventData)
    }

}