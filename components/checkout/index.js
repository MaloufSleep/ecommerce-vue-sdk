import ShippingForm from './forms/shippingAddress.vue'
import CardForm from './forms/card.vue'

export default Vue => {
    Vue.component(ShippingForm.name, ShippingForm)
    Vue.component(CardForm.name, CardForm)
}