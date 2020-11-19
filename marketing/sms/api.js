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
    subscribe(phoneNumber, first_name = null, last_name = null){
        return this.axios.post(`marketing/sms/subscribe`, {
            phone_number: phoneNumber,
            first_name,
            last_name
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