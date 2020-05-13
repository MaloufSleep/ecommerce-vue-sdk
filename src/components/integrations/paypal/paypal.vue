<template>
    <div></div>
</template>

<script>
export default {
    name: 'ec-paypal',
    metaInfo(){
        const clientId = this.$services.paypal.clientId
        const src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
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
            this.$root.$emit('paypal:loaded')
        }
    }
}
</script>