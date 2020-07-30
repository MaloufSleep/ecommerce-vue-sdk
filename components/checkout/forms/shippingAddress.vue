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
        firstName: '',
        lastName: '',
        phone: '',
        street1: '',
        street2: '',
        locality: '',
        region: '',
        postcode: '',
        country: ''
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
  }
}
</script>