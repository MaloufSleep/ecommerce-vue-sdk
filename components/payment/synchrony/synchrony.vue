<template>
    <div></div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
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
                    callback: this.onLoad,
                    skip: this.loaded,
                    once: true,
                    body: true,
                }
            ]
        }
    },
    data(){
        return {
            auth: {
                clientToken: '',
                clientTransId: '',
            }
        }
    }, 
    computed: {
        ...mapState('payment/synchrony', ['loaded']),
        ...mapState('cart',['cart'])
    },
    methods: {
        ...mapMutations('payment/synchrony', ['setLoaded']),
        ...mapActions('cart', ['setCart']),
        onLoad(){
            this.setLoaded(true)
        },
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
            return this.$api.payment.synchrony.authenticate(this.cart.uuid).catch(err => {
                console.error(err)
                if(err.response?.data?.cart) this.setCart(err.response.data.cart)
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