export default class NewsletterService {

    constructor(repository){
        this.repository = repository
    }

    subscribe(email, first_name = null, last_name = null){
        return this.repository.subscribe(email, first_name, last_name)
    }

    unsubscribe(email){
        return this.repository.unsubscribe(email)
    }

}