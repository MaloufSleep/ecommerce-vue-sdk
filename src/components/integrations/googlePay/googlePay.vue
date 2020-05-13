<template>
    <div></div>
</template>

<script>
export default {
    name: 'ec-google-pay',
    metaInfo(){
        const src = 'https://pay.google.com/gp/p/js/pay.js'
        return {
            script: [
                {
                    src,
                    async: true,
                    defer: true,
                    callback: this.onLoad
                }
            ]
        }
    },
    methods: {
        onLoad(){
            this.$services.googlePay.initializePaymentsClient()
            this.$root.$emit('googlePay:loaded')
        }
    }
}
</script>