const state = () => {
    return  {
        loaded: false,
    }
}

const getters = {
}

const mutations = {
    setLoaded(state, loaded = false){
        state.loaded = loaded
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