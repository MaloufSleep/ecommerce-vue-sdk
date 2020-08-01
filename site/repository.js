export default class SiteRepository {

    constructor(store){
        this.store = store
    }

    getRegion(){
        return this.store.state.site.region
    }

    getLanguage(){
        return this.store.state.site.language
    }

    setRegion(region){
        this.store.commit('site/setRegion', region)
    }

    setLanguage(language){
        this.store.commit('site/setLanguage', language)
    }

}