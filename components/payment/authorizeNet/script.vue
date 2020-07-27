<template>
    <div></div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'ec-authorize-net-script',
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
                    src: this.production ? `https://js.authorize.net/v1/Accept.js` : `https://jstest.authorize.net/v1/Accept.js`,
                    async: true,
                    defer: true,
                    callback: this.onLoad,
                    charset: 'utf-8',
                    skip: this.loaded
                }
            ]
        }
    },
    computed: {
        ...mapState('payment/authorizeNet', ['loaded'])
    },
    methods: {
        ...mapMutations('payment/authorizeNet',['setLoaded']),
        onLoad(){
            this.setLoaded(true)
        }
    }
}
</script>