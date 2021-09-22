<template>
    <div id="paypal-button"></div>
</template>

<script>
export default {
    name: "ec-paypal-btn",
    data() {
        return {
        }
    },
    mounted() {
        this.renderButton()
    },
    methods: {
        style() {
            return {
                layout: 'vertical',
                color:  'blue',
                shape:  'rect',
                label:  'paypal'
            }
        },
        onClick() {
            this.$emit('click')
        },
        onCancel() {
            this.$emit('cancel')
        },
        onError(error) {
            this.$emit('error', error)
        },
        renderButton() {
            if(!window.paypal) return
            window.paypal.Buttons({
                ...this.$ecommerce.checkout.paypal.getHandlers(),
                style: this.style(),
                onCancel: this.onCancel.bind(this),
                onClick: this.onClick.bind(this),
                onError: this.onError.bind(this),
            }).render('#paypal-button');            
        },
    }
}
</script>

<style lang="scss" scoped>
</style>