<template>
    <!-- <button @click="onClick">
        <template>
            <span class="text">Buy with</span>
            <span class="logo" />
        </template>
        <div id="paypal-button"></div>
    </button> -->
    <div id="paypal-button"></div>
</template>

<script>
export default {
    name: "ec-paypal-btn",
    data() {
        return {
            paypal
        }
    },
    mounted() {
        this.paypal = window.paypal
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
        createOrder() {
            var that = this
            return ( function() {
                return fetch(`/checkout/paypal/createOrder`, {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then(res => {
                    that.$emit('success')
                    return res
                }).then(data => {
                    return data.id
                })
            })
        },
        onApprove() {
            var that = this
            return ( function(data) {
                return fetch(`/checkout/paypal/captureOrder`, {
                    headers: {
                        'content-type': 'applicaton/json'
                    },
                    body: JSON.stringify({
                        orderID: data.orderID
                    })
                }).then(res => {
                    return res
                }).then(details => {
                    alert('Transaction funds captures from ' + details.payer_given_name)
                })
            })
        },
        onClick() {
            var that = this
            return( function() {
                that.$emit('click')
            })
        },
        renderButton() {
            this.paypal.Buttons({
                fundingSource: paypal.FUNDING.PAYPAL,
                style: this.style(),
                createOrder: this.createOrder(),
                onApprove: this.onApprove(),
                onClick: this.onClick(),
            }).render('#paypal-button');            
        },
    }
}
</script>

<style lang="scss" scoped>
</style>