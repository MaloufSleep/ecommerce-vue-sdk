<template>
  <form>
    <slot
      :data="{
        address: address,
        zip: zip,
        state: state,
        city: city,
        cardNum: cardNum,
        cardExp: cardExp,
      }"
      :onInput="onInput"
    >
    </slot>
  </form>
</template>

<script>
export default {
  name: 'ec-payment-form',
  data () {
    return {
      firstNames: ''
    }
  },

  computed: {
    cardNum: {
      get () {
        return this.$store.state.checkout.card.number
      },
      set (value) {
        this.$store.commit('checkout/updateCardNumber', value)
      }
    },
    cardExp: {
      get () {
        return this.$store.state.checkout.card.exp
      },
      set (value) {
        this.$store.commit('checkout/updateCardExp', value)
      }
    },
    zip: {
      get () {
        return this.$store.state.checkout.card.zip
      },
      set (value) {
        this.$store.commit('checkout/updateCardZip', value)
      }
    },
    address: {
      get () {
        return this.$store.state.checkout.billingAddress.address
      },
      set (value) {
        this.$store.commit('checkout/updateBillingAddress', value)
      }
    },
    city: {
      get () {
        return this.$store.state.checkout.billingAddress.city
      },
      set (value) {
        this.$store.commit('checkout/updateBillingCity', value)
      }
    },
    state: {
      get () {
        return this.$store.state.checkout.billingAddress.state
      },
      set (value) {
        this.$store.commit('checkout/updateBillingState', value)
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