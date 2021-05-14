export default class NewsletterAPI {

    constructor(axios){
        this.axios = axios
    }

    /**
     * Subscribe to newsletter
     * @param {string} email
     * @param {string|null} first_name 
     * @param {string|null} last_name 
     * @param {string|null} cart_uuid - UUID of the cart (if present)
     */
    subscribe(email, first_name = null, last_name = null, cart_uuid = null){
        return this.axios.post(`marketing/newsletter/subscribe`, {
            email,
            first_name,
            last_name,
            cart_uuid
        })
    }

    /**
     * Subscribe to newsletter
     * @param {string} email
     */
    unsubscribe(email){
        return this.axios.post(`marketing/newsletter/unsubscribe`, {
            email
        })
    }

}