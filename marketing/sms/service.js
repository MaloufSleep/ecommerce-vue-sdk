export default class NewsletterService {

    constructor(api){
        this.api = api
    }

    subscribe(phoneNumber, first_name = null, last_name = null){
        return this.api.subscribe(phoneNumber, first_name, last_name)
    }

    unsubscribe(phoneNumber){
        return this.api.unsubscribe(phoneNumber)
    }

}