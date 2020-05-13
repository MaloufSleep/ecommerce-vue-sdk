<template>
    <div></div>
</template>

<script>
export default {
    name: 'ec-authorize-net',
    metaInfo(){
        const src = `https://jstest.authorize.net/v1/Accept.js`
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
            this.$root.$emit('authorizeNet:loaded')
        }
    }
}
</script>