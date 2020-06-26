<template>
  <form @submit.prevent="submitShipping">
    <slot
      :data="{
        firstName: firstName,
        lastName: lastName,
        address: address,
        zip: zip,
        city: city,
        state: state,
        email: email,
        phone: phone
      }"
      :onInput="onInput"
    >
    </slot>
  </form>
</template>

<script>
export default {
  name: 'ec-ship-form',
  data () {
    return {
      firstNames: ''
    }
  },

  computed: {
    firstName: {
      get () {
        return this.$store.state.checkout.firstName
      },
      set (value) {
        this.$store.commit('checkout/updateFirstName', value)
      }
    },
    lastName: {
      get () {
        return this.$store.state.checkout.lastName
      },
      set (value) {
        this.$store.commit('checkout/updateLastName', value)
      }
    },
    address: {
      get () {
        return this.$store.state.checkout.shippingAddress.address
      },
      set (value) {
        this.$store.commit('checkout/updateShipAddress', value)
      }
    },
    zip: {
      get () {
        return this.$store.state.checkout.shippingAddress.zip
      },
      set (value) {
        this.$store.commit('checkout/updateShipZip', value)
      }
    },
    city: {
      get () {
        return this.$store.state.checkout.shippingAddress.city
      },
      set (value) {
        this.$store.commit('checkout/updateShipCity', value)
      }
    },
    state: {
      get () {
        return this.$store.state.checkout.shippingAddress.state
      },
      set (value) {
        this.$store.commit('checkout/updateShipState', value)
      }
    },
    email: {
      get () {
        return this.$store.state.checkout.email
      },
      set (value) {
        this.$store.commit('checkout/updateEmail', value)
      }
    },
    phone: {
      get () {
        return this.$store.state.checkout.phone
      },
      set (value) {
        this.$store.commit('checkout/updatePhone', value)
      }
    }
  },

  methods: {
    onInput(event, prop){
      this[prop] = event.target.value;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>