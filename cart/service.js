export default class CartService {

    constructor(repository){
        this.repository = repository
    }

    getCart(){
        return this.repository.get()
    }

    addItems(items){
        if(!Array.isArray(items)) items = [items]
        return this.repository.addItems(items)
    }

    updateItem(id, updates){
        return this.repository.updateItem(id, updates)
    }

    removeItems(items){
        if(!Array.isArray(items)) items = [items]
        return this.repository.removeItems(items)
    }

}