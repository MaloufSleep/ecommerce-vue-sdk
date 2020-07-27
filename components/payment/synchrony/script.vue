<template>
    <div></div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'ec-synchrony-script',
    props: {
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
                    skip: this.loaded
                }
            ]
        }
    },
    computed: {
        ...mapState('payment/synchrony', ['loaded'])
    },
    methods: {
        ...mapMutations('payment/synchrony', ['setLoaded']),
        onLoad(){
            this.setLoaded(true)
        }
    }
}
</script>