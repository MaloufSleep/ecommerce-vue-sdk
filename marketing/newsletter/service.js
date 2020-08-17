export default class NewsletterService {

    constructor(api){
        this.api = api
    }

    subscribe(email, first_name = null, last_name = null){
        return this.api.subscribe(email, first_name, last_name)
    }

    unsubscribe(email){
        return this.api.unsubscribe(email)
    }

}