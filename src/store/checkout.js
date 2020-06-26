const state = () => {
  return  {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      shippingAddress: {
          address: '',
          zip: '',
          city: '',
          state: ''
      },
      billingAddress: {
        address: '',
        zip: '',
        city: '',
        state: ''
      },
      card: {
          number: '',
          exp: '',
          zip: ''
      },
      shippingPreference: {},
      wantsEmailContact: false,
      wantsTextContact: true
  }
}

const getters = {
  
}

const mutations = {
  updateFirstName (state, fname) {
      state.firstName = fname
  },

  updateLastName (state, lname) {
      state.lastName = lname
  },

  updateEmail (state, email) {
      state.email = email
  },

  updatePhone (state, phone) {
      state.phone = phone
  },

  updateShipAddress (state, address) {
      state.shippingAddress.address = address
  },

  updateShipZip (state, zip) {
      state.shippingAddress.zip = zip
  },

  updateShipCity (state, shipCity) {
      state.shippingAddress.city = shipCity
  },

  updateShipState (state, shipState) {
      state.shippingAddress.state = shipState
  },

  updateShippingPreference (state, shipPref) {
      state.shippingPreference = Object.assign(shipPref)
  },

  updateEmailPreference (state, emailPref) {
      state.wantsEmailContact = emailPref
  },

  updateTextPreference (state, textPref) {
      state.wantsTextContact = textPref
  },

  updateCardNumber (state, number) {
      state.card.number = number
  },

  updateCardExp (state, exp) {
      state.card.exp = exp
  },

  updateCardZip (state, zip) {
      state.billingAddress.zip = zip
      state.card.zip = zip
  },

  updateBillingAddress (state, address) {
      state.billingAddress.address = address
  },

  updateBillingCity (state, city) {
      state.billingAddress.city = city
  },

  updateBillingState (state, cState) {
      state.billingAddress.state = cState
  },
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}