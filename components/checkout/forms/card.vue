<template>
    <div class="card-form">
        <form>
            <slot
                :onInput="onInput"
                :card="card"
                :address="address"
                :canSubmit="canSubmit"
            />
        </form>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'ec-card-form',
    props: {
        merchantId: {
            type: String,
            required: true
        },
        merchantKey: {
            type: String,
            required: true
        },
        production: {
            type: Boolean,
            default: false
        }
    },
    metaInfo(){
        return {
            script: [
                {
                    src: this.production ? `https://js.authorize.net/v1/Accept.js` : `https://jstest.authorize.net/v1/Accept.js`,
                    async: true,
                    defer: true,
                    callback: this.onScriptLoad,
                    charset: 'utf-8',
                    skip: this.loaded,
                    once: true,
                    body: true,
                }
            ]
        }
    },
    data(){
        return {
            card: {
                name: '',
                number: '',
                expiration: '',
                securityCode: ''
            },
            address: {
                sameAsShipping: true,
                firstName: '',
                lastName: '',
                phone: '',
                street1: '',
                street2: '',
                locality: '',
                region: '',
                postcode: '',
                country: ''
            }
        }
    },
    computed: {
        ...mapGetters('cart', ['uuid']),
        ...mapState('payment/authorizeNet',['loaded']),
        canSubmit(){
            return window.Accept
        },
    },
    methods: {
        ...mapMutations('payment/authorizeNet',['setLoaded']),
        ...mapActions('checkout', ['orderCompleted']),
        ...mapActions('cart', ['setCart']),
        onInput(value, obj, prop){
            console.log(value, obj, prop)
            this[obj][prop] = value
        },
        onScriptLoad(){
            this.setLoaded(true)
        },
        getNonce(){
            // build request parameters
            let exp = this.card.expiration.split('/')
            let params = {
                authData: {
                    clientKey: this.merchantKey,
                    apiLoginID: this.merchantId
                },
                cardData: {
                    cardNumber: this.card.number,
                    month: exp[0],
                    year: exp[1],
                    cardCode: this.card.securityCode
                }
            }

            // request nonce from Accept.js
            return new Promise((resolve, reject) => {
                window.Accept.dispatchData(params, (res) => {
                    if(res.messages.resultCode === 'Error') reject(res)
                    else resolve(res)
                })
            })
        },
        submit(){
            if(!this.canSubmit) return Promise.reject('Unable to process payment, card information invalid or Accept.js not loaded.')
            
            // get nonce and submit payment
            return this.getNonce().catch(err => {
                console.error(err)
                throw err
            }).then(res => {
                return this.$api.payment.card.nonce(this.cart.uuid, res.opaqueData.dataValue, this.getBillingAddress)
            }).catch(err => {
                console.error(err)
                if(err.response?.data?.cart) this.setCart(err.response.data.cart)
                throw err
            }).then(res => {
                console.log(res)
                this.orderCompleted(res)
            })
        }
    }
}
</script>