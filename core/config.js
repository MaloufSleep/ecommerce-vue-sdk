import Vue from "vue"

export default class Config {

    constructor(){
        this.endpoint = 'http://localhost'
        this.paymentEnvironment = 'development'
        this.intl = {
            region: null,
            lang: 'en'
        }
        // this.eventBus = new Vue()

        this.trackerConfig = []

        this.includeFilters = true
    }

}