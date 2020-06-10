<template>
    <div></div>
</template>

<script>
export default {
    name: 'ec-synchrony',
    metaInfo(){
        const src = 'https://ubuy.syf.com/digitalbuy/js/merchant_ff.js'
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
            this.$emit('loaded')
        }
    }
}
</script>