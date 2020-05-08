export default class Address {
    constructor(fields = {}){
        this.id = fields.id || null
        this.firstName = fields.firstName || ''
        this.lastName = fields.lastName || ''
        this.phoneNumber = fields.phoneNumber || ''
        this.email = fields.email || ''
        this.line1 = fields.line1 || ''
        this.line2 = fields.line2 || ''
        this.locality = fields.locality || ''
        this.region = fields.region || ''
        this.postcode = fields.postcode || ''
        this.country = fields.country || ''
    }
}