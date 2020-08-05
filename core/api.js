import axios from 'axios'

class ApiRepository {
    constructor(store){
        this.store = store
    }

    getRegionUuid(){
        return this.store.state.site.region.uuid
    }

    getLanguage(){
        return this.store.state.site.language
    }
}

export default (endpoint, store) => {
    const repository = new ApiRepository(store)

    const axiosInstance = axios.create({
        baseURL: `${endpoint}/api-v2/ecommerce`,
        headers: {
            accept: 'application/json',
        }
    })

    // TODO: add interceptors for API errors (build error classes)
    axiosInstance.interceptors.request.use(function(config){
        config.headers['X-Site-Region'] = repository.getRegionUuid()
        config.headers['X-Site-Language'] = repository.getLanguage()
        return config
    })

    return axiosInstance
}