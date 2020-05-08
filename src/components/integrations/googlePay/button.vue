<template>
    <div :id="id"></div>
</template>

<script>
import uniqueId from 'lodash/uniqueId'

export default {
    name: 'ec-google-pay-button',
    data(){
        return {
            id: uniqueId('google-pay-btn-')
        }
    },
    methods: {
        verifyGooglePayLoaded(){
            if(window.google){
                this.googlePayLoaded()
            }else{
                this.$eventBus.$on('googlePay:loaded', () => {
                    this.googlePayLoaded()
                    this.$eventBus.$off('googlePay:loaded')
                })
            }
        },
        googlePayLoaded(){
            this.$services.googlePay.isReadyToPay().then(res => {
                if(res.result){
                    this.renderButton()
                }
            }).catch(err => {
                console.error(err)
            })
        },
        renderButton(){
            const button = this.$services.googlePay.createButton({
                onClick: this.handleButtonClick,
                buttonType: 'short'
            })
            document.getElementById(this.id).appendChild(button)
        },
        handleButtonClick(){
            console.log('Button clicked')
        }
    },
    mounted(){
        this.verifyGooglePayLoaded()
    }
}
</script>

<style lang="scss" scoped>

</style>