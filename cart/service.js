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

    applyPromotion(code){
        return this.repository.applyPromotion(code)
    }

    removePromotion(promotion_id){
        return this.repository.removePromotion(promotion_id)
    }

    loadCart(uuid){
        return this.repository.loadCart(uuid)
    }

}