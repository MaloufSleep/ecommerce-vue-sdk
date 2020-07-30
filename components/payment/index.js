// Synchrony
import Synchrony from './synchrony/synchrony.vue'

export default Vue => {
    // Synchrony
    Vue.component(Synchrony.name, Synchrony)
}

/*
// PayPal
import PayPalScript from './paypal/script.vue'
import PayPalButton from './paypal/button.vue'

// Apple Pay
import ApplePayButton from './applePay/button.vue'

// Google Pay
import GooglePayScript from './googlePay/script.vue'
import GooglePayButton from './googlePay/button.vue'

export default Vue => {
    // Paypal
    Vue.component(PayPalScript.name, PayPalScript)
    Vue.component(PayPalButton.name, PayPalButton)

    // Apple Pay
    Vue.component(ApplePayButton.name, ApplePayButton)

    // Google Pay
    Vue.component(GooglePayScript.name, GooglePayScript)
    Vue.component(GooglePayButton.name, GooglePayButton)
}
*/
