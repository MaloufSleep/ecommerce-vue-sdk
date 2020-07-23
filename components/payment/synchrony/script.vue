<template>
    <div></div>
</template>

<script>
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
                    callback: this.onLoad
                }
            ]
        }
    },
    methods: {
        onLoad(){
            this.$emit('onLoad')
        }
    }
}
</script>