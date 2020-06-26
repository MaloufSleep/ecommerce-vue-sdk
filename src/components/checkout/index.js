import ShipForm from './shippingForm.vue'
import PayForm from './paymentForm.vue'

export default Vue => {
    Vue.component(ShipForm.name, ShipForm)
    Vue.component(PayForm.name, PayForm)
}