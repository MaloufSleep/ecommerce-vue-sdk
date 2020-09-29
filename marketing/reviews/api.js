export default class ReviewsAPI {

    constructor(axios){
        this.axios = axios
    }

    /**
     * Get all products the customer should review
     * @param {int} customer_id
     */
    getReviewableProducts(customer_id){
        return this.axios.get(`reviews/${customer_id}/products`)
    }

    /**
     * Submit a review
     * @param {int} customer_id
     * @param {object} review
     */
    submitReview(customer_id, review){
        return this.axios.post(`reviews/${customer_id}`, review)
    }

}