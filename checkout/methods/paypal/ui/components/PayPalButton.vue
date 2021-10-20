<template>
    <div id="paypal-button"></div>
</template>

<script>
export default {
    name: "ec-paypal-btn",

    props: {
        pStyle: {
            type: Object,
            default(){
                return {
                    layout: 'vertical',
                    color:  'blue',
                    shape:  'rect',
                    label:  'paypal'
                }
            }
        }
    },

    data() {
        return {}
    },
    mounted() {
        this.renderButton()
    },
    methods: {
        onSuccess() {
            this.$emit('success')
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
            this.$ecommerce.checkout.paypal.isAvailable().then(res => {
                if(!res.available) return
                return this.$ecommerce.checkout.paypal.renderButton(
                    '#paypal-button', 
                    {
                        onSuccess: this.onSuccess.bind(this),
                        onCancel: this.onCancel.bind(this),
                        onClick: this.onClick.bind(this),
                        onError: this.onError.bind(this)
                    }, 
                    {
                        style: this.pStyle,
                    }
                )
            })        
        },
    }
}
</script>

<style lang="scss" scoped>
</style>