export default class NewsletterService {

    constructor(api){
        this.api = api
    }

    subscribe(phoneNumber, email = null, first_name = null, last_name = null, signUpSourceId = null){
        return this.api.subscribe(phoneNumber, email, first_name, last_name, signUpSourceId)
    }

    unsubscribe(phoneNumber){
        return this.api.unsubscribe(phoneNumber)
    }

}