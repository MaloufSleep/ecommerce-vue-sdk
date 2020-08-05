
export default class AuthNetCardService {

    constructor(repository, authNet){
        this.repository = repository
        this.authNet = authNet
    }

    process(card, address){
        return this.authNet.getNonceForCard(card.number, card.month, card.year, card.code, card.name || '').then(res => {
            if(!res.nonce) throw "Failed to aquire nonce for card processing"
            return res.nonce
        }).then(res => {
            return this.repository.processNonce(res, address)
        })
    }

}
