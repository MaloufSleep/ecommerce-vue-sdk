export default class StoresService {

    constructor(api){
        this.api = api
    }
  
    /**
     * Get stores with optional search parameters
     * @param {number|null} lat latitude of center point
     * @param {number|null} lng longitude of center point
     * @param {int} distance distance (in miles) of search radius
     */
    getStores(lat = null, lng = null, distance = 100){
        return this.api.getStores(lat, lng, distance)
    }

}