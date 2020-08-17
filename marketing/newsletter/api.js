export default class NewsletterAPI {

    constructor(axios){
        this.axios = axios
    }

    /**
     * Subscribe to newsletter
     * @param {string} email
     * @param {string|null} first_name 
     * @param {string|null} last_name 
     */
    subscribe(email, first_name = null, last_name = null){
        return this.axios.post(`marketing/newsletter/subscribe`, {
            email,
            first_name,
            last_name
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