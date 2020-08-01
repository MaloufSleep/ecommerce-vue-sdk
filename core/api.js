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

export default (context) => {
    const repository = new ApiRepository(context.store)

    const axiosInstance = axios.create({
        baseURL: `${context.config.endpoint}/api-v2/ecommerce`,
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        }
    })

    axiosInstance.interceptors.request.use(function(config){
        config.headers['X-Site-Region'] = repository.getRegionUuid()
        config.headers['X-Site-Language'] = repository.getLanguage()
        return config
    })

    return axiosInstance
}