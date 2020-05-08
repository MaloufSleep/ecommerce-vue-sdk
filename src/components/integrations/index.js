import PayPal from './paypal/paypal.vue'
import PayPalButton from './paypal/button.vue'
import Synchrony from './synchrony/synchrony.vue'
import GooglePay from './googlePay/google.vue'
import GooglePayButton from './googlePay/button.vue'

export default Vue => {
    Vue.component(PayPal.name, PayPal)
    Vue.component(PayPalButton.name, PayPalButton)
    Vue.component(Synchrony.name, Synchrony)
    Vue.component(GooglePay.name, GooglePay)
    Vue.component(GooglePayButton.name, GooglePayButton)
}