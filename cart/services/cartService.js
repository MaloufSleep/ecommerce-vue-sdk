export default class CartService {

    constructor(repository){
        this.repository = repository
    }

    getCart(){
        return this.repository.getCart()
    }

    

}