export default class Config {

    constructor(){
        this.endpoint = 'http://localhost'
        this.paymentEnvironment = 'development'
        this.intl = {
            region: null,
            lang: 'en'
        }

        this.includeFilters = true
    }

}