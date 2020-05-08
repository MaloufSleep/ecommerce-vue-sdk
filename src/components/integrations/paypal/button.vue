<template>
    <div :id="id" :style="styles" class="ec-paypal-button"></div>
</template>

<script>
import uniqueId from 'lodash/uniqueId'

export default {
    name: 'ec-paypal-button',
    props: {
        styles: Object,
        source: {
            type: String,
            default: 'paypal'
        },
        label: String,
        color: String,
        height: Number,
        shape: String,
        layout: String
    },
    data(){
        return {
            id: uniqueId('paypal-btn-')
        }
    },
    methods: {
        verifyPaypalLoaded(){
            if(window.paypal){
                this.paypalLoaded()
            }else{
                this.$eventBus.$on('paypal:loaded', () => {
                    this.paypalLoaded()
                    this.$eventBus.$off('paypal:loaded')
                })
            }
        },
        paypalLoaded(){
            this.renderButton()
        },
        renderButton(){
            let btnConfig = {fundingSource: this.source, style: {}}
            if(this.label) btnConfig.style.label = this.label
            if(this.color) btnConfig.style.color = this.color
            if(this.height) btnConfig.style.height = this.height
            if(this.shape) btnConfig.style.shape = this.shape
            if(this.layout) btnConfig.style.layout = this.layout

            let button = window.paypal.Buttons(btnConfig)
            if(button.isEligible()){
                button.render(`#${this.id}`)
            }
        }
    },
    mounted(){
        this.verifyPaypalLoaded()
    }
}
</script>

<style lang="scss" scoped>
    .ec-paypal-button{
        width: 100%;
        max-width: 300px;
        min-width: 80px;
        height: 40px;
    }
</style>