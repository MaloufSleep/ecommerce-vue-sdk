<template>
    <div></div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Dinero from 'dinero.js'

export default {
    name: 'ec-synchrony',
    props: {
        merchantId: {
            type: String,
            required: true
        },
        promotion: {
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
                    src: this.production ? 'https://buy.syf.com/digitalbuy/js/merchant_ff.js' : 'https://ubuy.syf.com/digitalbuy/js/merchant_ff.js',
                    async: true,
                    defer: true,
                    callback: this.setScriptLoaded('synchrony'),
                    skip: this.getScriptLoaded('synchrony'),
                    once: true,
                    body: true,
                }
            ]
        }
    },
    data(){
        return {
            auth: {}
        }
    }, 
    computed: {
        ...mapGetters('payment', ['getScriptLoaded']),
        ...mapState('cart',['cart'])
    },
    methods: {
        ...mapMutations('payment', ['setScriptLoaded']),
        ...mapActions('payment/synchrony', ['authenticate']),
        getTransactionDetails(){
            return {
                processInd: 3,
                tokenId:  this.auth.clientToken,
                clientTransId: this.auth.clientTransId,
                merchantID: this.merchantId,
                custZipCode: this.cart.shipping_address.postcode,
                custAddress1: this.cart.shipping_address.street_1,
                custAddress2: this.cart.shipping_address.street_2 || '',
                custCity: this.cart.shipping_address.locality,
                custState: this.cart.shipping_address.region,
                transPromo1: this.promotion,
                transAmount1: `${Dinero({amount: this.cart.totals.total, precision: 2}).toUnit()}`
            }
        },
        launchModal(){
            return new Promise((resolve, reject) => {
                window.syfDBuy.calldBuyProcess(null, this.getTransactionDetails())
                resolve(true)
            })
        },
        submit(){
            if(!window.syfDBuy) return Promise.reject('Digital Buy is not available.')
            return this.authenticate().catch(err => {
                console.error(err)
                throw err
            }).then(res => {
                console.log(res)
                this.auth = res.data.data
                return this.launchModal()
            }).then(res => {
                console.log('modal launched')
            })
        }
    }
}
</script>