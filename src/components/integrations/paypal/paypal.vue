<template>
    <div></div>
</template>

<script>
export default {
    name: 'ec-paypal',
    metaInfo(){
        const src = `https://www.paypal.com/sdk/js?client-id=${this.clientId}`
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
    props: {
        clientId: {
            type: String,
            default: 'sb'
        }
    },
    methods: {
        onLoad(){
            this.$eventBus.$emit('paypal:loaded')
        }
    }
}
</script>