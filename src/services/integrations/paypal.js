
export class PaypalService {

    #api
    #store

    constructor(api, store, config){
        this.#api = api
        this.#store = store
    }

}