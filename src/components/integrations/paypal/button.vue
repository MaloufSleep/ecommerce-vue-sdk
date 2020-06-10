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
            id: uniqueId('paypal-btn-'),
            rendered: false,
            paypalService: this.$services.paypal
        }
    },
    computed: {
        loaded: function(){
            return this.paypalService.loaded
        }
    },
    watch: {
        loaded: function(newVal){
            if(newVal) this.renderButton()
        }
    },
    methods: {
        renderButton(){
            if(this.rendered) return

            let btnConfig = {
                fundingSource: this.source, 
                style: {},
                createOrder: this.createOrder,
                onApprove: this.onApprove,
                onShippingChange: this.onShippingChange,
                onError: this.onError,
                onCancel: this.onCancel
            }
            if(this.label) btnConfig.style.label = this.label
            if(this.color) btnConfig.style.color = this.color
            if(this.height) btnConfig.style.height = this.height
            if(this.shape) btnConfig.style.shape = this.shape
            if(this.layout) btnConfig.style.layout = this.layout

            let button = window.paypal.Buttons(btnConfig)
            if(button.isEligible()){
                button.render(`#${this.id}`)
            }
        },
        createOrder(data, actions){
            console.log('createOrder')
            return this.$services.paypal.createOrder(data, actions).then(res => {
                console.log(res)
                return res
            }).catch(err => {
                console.error(err)
            })
        },
        onApprove(data, actions){
            console.log('onApprove')
            return this.$services.paypal.onApprove(data, actions).then(res => {
                console.log(res)
                return res
            }).catch(err => {
                console.error(err)
            })
        },
        onShippingChange(data, actions){
            console.log('onShippingChange')
            return this.$services.paypal.onShippingChange(data, actions).then(res => {
                console.log(res)
            }).catch(err => {
                this.$emit('error', err)
                console.error(err)
            })
        },
        onError(err){
            console.log('onError')
            console.error(err)
            this.$emit('error', err)
        },
        onCancel(data){
            console.log('onCancel')
            console.log(data)
            this.$emit('cancelled', data)
        }
    },
    mounted(){
        if(this.paypalService.loaded) this.renderButton()
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