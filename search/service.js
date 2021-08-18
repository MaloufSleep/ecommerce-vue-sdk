export default class SearchService {

  constructor(api){
      this.api = api
  }

  /**
   * Search products and keywords
   * @param {string} search_term
   */
  search(search_term){
      return this.api.search(search_term)
  }
}