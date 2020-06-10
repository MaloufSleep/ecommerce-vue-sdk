// PayPal
import PayPalScript from './paypal/script.vue'
import PayPalButton from './paypal/button.vue'

// Apple Pay
import ApplePayButton from './applePay/button.vue'

// Google Pay
import GooglePayScript from './googlePay/script.vue'
import GooglePayButton from './googlePay/button.vue'

// Synchrony
import SynchronyScript from './synchrony/script.vue'

// Authorize.Net
import AuthorizeNetScript from './authorizeNet/script.vue'

export default Vue => {
    // Paypal
    Vue.component(PayPalScript.name, PayPalScript)
    Vue.component(PayPalButton.name, PayPalButton)

    // Apple Pay
    Vue.component(ApplePayButton.name, ApplePayButton)

    // Google Pay
    Vue.component(GooglePayScript.name, GooglePayScript)
    Vue.component(GooglePayButton.name, GooglePayButton)

    // Synchrony
    Vue.component(SynchronyScript.name, SynchronyScript)
    
    // Authorize.Net
    Vue.component(AuthorizeNetScript.name, AuthorizeNetScript)
}