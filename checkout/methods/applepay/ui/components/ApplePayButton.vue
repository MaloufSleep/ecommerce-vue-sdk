<template>
    <button :class="[buttonClasses, classes]" @click="onClick" :style="styles">
        <template v-if="buttonType === 'buy'">
            <span class="text">Buy with</span>
            <span class="logo" />
        </template>
    </button>
</template>

<script>
export default {
    name: "ec-apple-pay-btn",
    props: {
        merchantId: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: "plain",
            validator: function(value) {
                return (
                    [
                        "plain",
                        "buy",
                        "set-up",
                        "donate",
                        "check-out",
                        "book",
                        "subscribe"
                    ].indexOf(value) !== -1
                );
            }
        },
        color: {
            type: String,
            default: "black",
            validator: function(value) {
                return ["black", "white"].indexOf(value) !== -1;
            }
        },
        line: {
            type: Boolean,
            default: false
        },
        styles: {
            type: [Object, Array],
            required: false
        },
        classes: {
            type: [Object, Array],
            required: false
        }
    },
    data() {
        return {
            setup: false,
        };
    },
    computed: {
        buttonType() {
            return this.setup ? 'set-up' : this.type
        },
        buttonClasses() {
            if (this.buttonType === "buy") return `apple-pay-button-with-text apple-pay-button-${this.color}${this.line ? "-with-line" : ""}-with-text`
            else return `apple-pay-button apple-pay-${this.buttonType}-button apple-pay-button-${this.color}${this.line ? "-with-line" : ""}`
        }
    },
    methods: {
        renderButton() {
            window.ApplePaySession.canMakePaymentsWithActiveCard(this.merchantId).then(canMakePayments => {
                if(canMakePayments){
                    this.$emit('canMakePaymentsWithActiveCard')
                }else{
                    if(window.ApplePaySession.openPaymentSetup) this.setup = true
                }
            })
        },
        openPaymentSetup(){
            window.ApplePaySession.openPaymentSetup(this.merchantId)
            .then(success => {
                if(!success){
                    this.$emit('openPaymentSetupFailed')
                    console.error('Failed to open Apple Pay setup')
                }
            }).catch(err => {
                console.error(err)
            })
        },
        onClick() {
            if (this.setup){ 
                this.openPaymentSetup()
            }else{
                this.$emit('click')
            }
        },
        checkAvailability(){
            if(window.ApplePaySession){
                console.log('Apple Pay: checking for active card...')
                window.ApplePaySession.canMakePaymentsWithActiveCard(this.merchantId).then(available => {
                    if(available){
                        console.log('Active card found!')
                        this.$emit('canMakePayments')
                    }else if(window.ApplePaySession.openPaymentSetup){
                        console.log('No active card found')
                        this.setup = true
                    }
                })
            }
        }
    },
    mounted() {
        this.checkAvailability()
    }
};
</script>

<style scoped>
.apple-pay-button, .apple-pay-button-with-text{
    user-select: none;
    cursor: pointer;
}
@supports (-webkit-appearance: -apple-pay-button) {
    /* Template for logo only button (height independent). */
    .apple-pay-button {
        display: inline-block;
        -webkit-appearance: -apple-pay-button;
    }
    .apple-pay-button-black {
        -apple-pay-button-style: black;
    }
    .apple-pay-button-black-with-line {
        -apple-pay-button-style: black-outline;
    }
    .apple-pay-button-white {
        -apple-pay-button-style: white;
    }
    .apple-pay-button-white-with-line {
        -apple-pay-button-style: white-outline;
    }
    /* Template for "Buy with" button with height: 32 */
    .apple-pay-button-with-text {
        display: inline-block;
        -webkit-appearance: -apple-pay-button;
        -apple-pay-button-type: buy;
    }
    .apple-pay-button-with-text > * {
        display: none;
    }
    .apple-pay-button-black-with-text {
        -apple-pay-button-style: black;
    }
    .apple-pay-button-black-with-line-with-text {
        -apple-pay-button-style: black-outline;
    }
    .apple-pay-button-white-with-text {
        -apple-pay-button-style: white;
    }
    .apple-pay-button-white-with-line-with-text {
        -apple-pay-button-style: white-outline;
    }
    /* Template for additional Apple Pay button types */
    .apple-pay-set-up-button {
        -apple-pay-button-type: set-up;
    }
    .apple-pay-donate-button {
        -apple-pay-button-type: donate;
    }
    .apple-pay-check-out-button {
        -apple-pay-button-type: check-out;
    }
    .apple-pay-book-button {
        -apple-pay-button-type: book;
    }
    .apple-pay-subscribe-button {
        -apple-pay-button-type: subscribe;
    }
}
@supports not (-webkit-appearance: -apple-pay-button) {
    /* Template for logo only button (height independent). */
    .apple-pay-button {
        display: inline-block;
        background-size: 100% 60%;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        border-radius: 5px;
        padding: 0px;
        box-sizing: border-box;
        min-width: 200px;
        min-height: 32px;
        max-height: 64px;
    }
    .apple-pay-button-black {
        background-image: -webkit-named-image(apple-pay-logo-white);
        background-color: black;
    }
    .apple-pay-button-white {
        background-image: -webkit-named-image(apple-pay-logo-black);
        background-color: white;
    }
    .apple-pay-button-white-with-line {
        background-image: -webkit-named-image(apple-pay-logo-black);
        background-color: white;
        border: 0.5px solid black;
    }
    /* Template for "Buy with" button with height: 32 */
    .apple-pay-button-with-text {
        --apple-pay-scale: 1; /* (height / 32) */
        display: inline-flex;
        justify-content: center;
        font-size: 12px;
        border-radius: 5px;
        padding: 0px;
        box-sizing: border-box;
        min-width: 200px;
        min-height: 32px;
        max-height: 64px;
    }
    .apple-pay-button-black-with-text {
        background-color: black;
        color: white;
    }
    .apple-pay-button-white-with-text {
        background-color: white;
        color: black;
    }
    .apple-pay-button-white-with-line-with-text {
        background-color: white;
        color: black;
        border: 0.5px solid black;
    }
    .apple-pay-button-with-text.apple-pay-button-black-with-text > .logo {
        background-image: -webkit-named-image(apple-pay-logo-white);
        background-color: black;
    }
    .apple-pay-button-with-text.apple-pay-button-white-with-text > .logo {
        background-image: -webkit-named-image(apple-pay-logo-black);
        background-color: white;
    }
    .apple-pay-button-with-text.apple-pay-button-white-with-line-with-text
        > .logo {
        background-image: -webkit-named-image(apple-pay-logo-black);
        background-color: white;
    }
    .apple-pay-button-with-text > .text {
        font-family: -apple-system;
        font-size: calc(1em * var(--apple-pay-scale));
        font-weight: 300;
        align-self: center;
        margin-right: calc(2px * var(--apple-pay-scale));
    }
    .apple-pay-button-with-text > .logo {
        width: calc(35px * var(--scale));
        height: 100%;
        background-size: 100% 60%;
        background-repeat: no-repeat;
        background-position: 0 50%;
        margin-left: calc(2px * var(--apple-pay-scale));
        border: none;
    }
}
</style>