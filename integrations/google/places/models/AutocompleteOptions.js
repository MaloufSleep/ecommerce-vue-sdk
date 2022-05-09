
export default class AutocompleteOptions {

    /**
     * A grouping of places to which you would like to restrict your results. Currently, you can use components to filter 
     * by up to 5 countries. Countries must be passed as a two character, ISO 3166-1 Alpha-2 compatible country code. 
     * For example: components=country:fr would restrict your results to places within France.
     * https://developers.google.com/maps/documentation/places/web-service/autocomplete#components
     * 
     * @var {string|null}
     */
    components = 'country:us'

    /**
     * The language in which to return results.
     * https://developers.google.com/maps/documentation/places/web-service/autocomplete#language
     * Supported languages: https://developers.google.com/maps/faq#languagesupport
     * 
     * @var {string|null}
     */
    language = 'en'

    /**
     * The point around which to retrieve place information. This must be specified as latitude,longitude.
     * https://developers.google.com/maps/documentation/places/web-service/autocomplete#location
     * 
     * @var {string|null}
     */
    location = null

    /**
     * The position, in the input term, of the last character that the service uses to match predictions.
     * For example, if the input is Google and the offset is 3, the service will match on Goo.
     * https://developers.google.com/maps/documentation/places/web-service/autocomplete#offset
     * 
     * @var {int|null}
     */
    offset = null

    /**
     * The origin point from which to calculate straight-line distance to the destination (returned as distance_meters). 
     * If this value is omitted, straight-line distance will not be returned. Must be specified as latitude,longitude.
     * https://developers.google.com/maps/documentation/places/web-service/autocomplete#origin
     * 
     * @var {string|null}
     */
    origin = null

    /**
     * Defines the distance (in meters) within which to return place results. You may bias results to a specified circle 
     * by passing a location and a radius parameter. Doing so instructs the Places service to prefer showing results within 
     * that circle; results outside of the defined area may still be displayed.
     * https://developers.google.com/maps/documentation/places/web-service/autocomplete#radius
     * 
     * @var {string|null}
     */
    radius = null

    /**
     * A random string which identifies an autocomplete session for billing purposes.
     * https://developers.google.com/maps/documentation/places/web-service/autocomplete#sessiontoken
     * 
     * @var {string|null}
     */
    sessiontoken = null

    /**
     * Returns only those places that are strictly within the region defined by location and radius. This is a restriction, rather than 
     * a bias, meaning that results outside this region will not be returned even if they match the user input.
     * https://developers.google.com/maps/documentation/places/web-service/autocomplete#sessiontoken
     * 
     * @var {string|null}
     */

    /**
     * You may restrict results from a Place Autocomplete request to be of a certain type by passing a types parameter. The parameter specifies 
     * a type or a type collection, as listed in the supported types below. If nothing is specified, all types are returned.
     * https://developers.google.com/maps/documentation/places/web-service/autocomplete#types
     * 
     * @var {string|null}
     */
    types = null
}
