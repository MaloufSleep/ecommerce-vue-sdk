export default class SearchAPI {

  constructor(axios){
      this.axios = axios
  }

  /**
   * Search products and keywords
   * @param {string} search_term
   */
  search(search_term){
      return this.axios.post(`search`, search_term)
  }

}