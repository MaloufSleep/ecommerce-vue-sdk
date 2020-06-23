const state = () => {
    return  {
        locale: 'en-us',
        currency: 'USD'
    }
}

const getters = {
}

const mutations = {
    setLocale(state, locale){
        state.locale = locale
    },
    setCurrency(state, currency){
        state.currency = currency
    }
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