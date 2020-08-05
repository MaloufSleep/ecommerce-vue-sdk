export default class Cart {
    constructor(data){
        Object.assign(this, data)
    }

    itemCount(){
        return this.items?.active?.reduce((total, item) => total + item.quantity, 0) || 0
    }

    getItems(type = 'active'){
        return this.items?.[type] || []
    }
}