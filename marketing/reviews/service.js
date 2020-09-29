export default class ReviewsService {

    constructor(api){
        this.api = api
    }

    getReviewableProducts(customer_id){
        return this.api.getReviewableProducts(customer_id)
    }

    /**
     * Submit a review
     * @param {int} customer_id
     * @param {object} review
     *      @var {int} product_id
     *      @var {int} rating
     *      @var {string=} title
     *      @var {string=} text
     *      @var {string=} display_name
     */
    submitReview(customer_id, review){
        return this.api.submitReview(customer_id, review)
    }
}