
export default class AuthNetCardService {

    constructor(repository, authNet){
        this.repository = repository
        this.authNet = authNet
    }

    process(card, address){
        return this.authNet.getNonceForCard(card.number, card.month, card.year, card.code, card.name || '').then(res => {
            if(!res.nonce) throw "Failed to aquire nonce for card processing"
            return res.nonce
        }).catch(err => {
            throw err.message?.text
        }).then(res => {
            return this.repository.processNonce(res, address)
        }).catch(err => {
            throw err.response?.data?.errors?.error?.[0]?.errorText
        })
    }

}
