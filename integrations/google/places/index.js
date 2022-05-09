import axios from 'axios'
import AutocompleteOptions from './models/AutocompleteOptions'

export default class GooglePlaces {

    constructor(apiKey){
        this.axios = axios.create({
            baseURL: `https://maps.googleapis.com/maps/api/place`,
            headers: {
                accept: 'application/json',
            },
            params: {
                key: apiKey
            }
        })

        this.axios.interceptors.response.use(this._handleResponse)
    }

    _handleResponse(response){
        let status = response.data?.status
        switch(status){
            case 'INVALID_REQUEST':
            case 'OVER_QUERY_LIMIT':
            case 'REQUEST_DENIED':
            case 'UNKNOWN_ERROR':
                throw `${status}: ${response.data?.error_message}`
            default: break
        }

        return response
    }


    /**
     * Used to provide autocomplete functionality for text-based geographic searches, by returning 
     * places such as businesses, addresses and points of interest as a user types.
     * https://developers.google.com/maps/documentation/places/web-service/autocomplete
     * 
     * @param {string} input 
     * @param {AutocompleteOptions} options 
     */
    autocomplete(input, options = new AutocompleteOptions()){
        let params = { input, ...options }
        return this.axios.get(`autocomplete/json`, { params }).then(response => {
            return response.data?.predictions
        })
    }

}
