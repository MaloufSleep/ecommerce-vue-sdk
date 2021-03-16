export default class ProductsService {

    constructor(api){
        this.api = api
    }

    getById(id, options = {}){
        return this.getByIds([id], options)
    }

    getByIds(ids, options = {}){
        return this.api.getByIds(ids, options).then(res => {
            return res.data
        })
    }

    getBySlug(slug, options = {}){
        return this.api.getBySlug(slug, options).then(res => {
            return res.data
        })
    }

}