<template>
  <form>
    <slot 
      :onChange="onChange"
      :complete="complete"
      :address="address"
    ></slot>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ec-shipping-address-form',
  data () {
    return {
      address: {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        street_1: '',
        street_2: '',
        locality: '',
        region: '',
        postcode: '',
        country: 'US'
      }
    }
  },
  computed: {
    ...mapState('cart',['cart'])
  },
  methods: {
    ...mapActions('cart', ['setShippingAddress']),
    complete(){
      this.setShippingAddress(this.address)
    },
    onChange(event, prop){
      this.address[prop] = event.target.value
    }
  },
  created(){
    if(this.cart.shipping_address){
      this.address = this.cart.shipping_address
    }
  }
}
</script>