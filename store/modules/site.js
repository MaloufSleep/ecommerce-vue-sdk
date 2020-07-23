const state = () => {
    return  {
        site: {}
    }
}

const getters = {
}

const mutations = {
    setSite(state, site){
        state.site = Object.assign({}, state.site, site)
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