export default class SiteService {

    constructor(repository){
        this.repository = repository
    }

    getRegion(){
        return Object.assign({}, this.repository.getRegion(), {language: this.repository.getLanguage()})
    }

    setRegion(region, language){
        // verify the region supports the language
        if(!region.languages || !region.languages?.length) throw "Region missing languages"

        let validLang = region.languages.some(lang => lang.iso639_1 === language)
        if(!validLang) throw `Region does not support language: ${language}`

        this.repository.setRegion(region)
        this.repository.setLanguage(language)

        return this.getRegion()
    }

}