export default class ProductsService {

    constructor(api){
        this.api = api
    }

    getById(id){
        return this.getByIds([id])
    }

    getByIds(ids){
        return this.api.getByIds(ids).then(res => {
            return res.data
        })
    }

    getBySlug(slug){
        return this.api.getBySlug(slug).then(res => {
            return res.data
        })
    }

}