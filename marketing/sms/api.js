export default class NewsletterAPI {

    constructor(axios){
        this.axios = axios
    }

    /**
     * Subscribe to newsletter
     * @param {string} phoneNumber
     * @param {string|null} first_name 
     * @param {string|null} last_name 
     */
    subscribe(phoneNumber, email = null, first_name = null, last_name = null, visitor_id = null){
        return this.axios.post(`marketing/sms/subscribe`, {
            phone_number: phoneNumber,
            email,
            first_name,
            last_name,
            visitor_id
        })
    }

    /**
     * Subscribe to newsletter
     * @param {string} phoneNumber
     */
    unsubscribe(phoneNumber){
        return this.axios.post(`marketing/sms/unsubscribe`, {
            phone_number: phoneNumber
        })
    }

}