import synchrony from './synchrony'

const modules = {
    synchrony
}

const state = () => {
    return  {
        scripts: {
            authnet: false,
            synchrony: false
        }
    }
}

const getters = {
    getScriptLoaded: state => (script) => {
        return state.scripts[script] || false
    }
}

const mutations = {
    setScriptLoaded(state, script){
        state.scripts[script] = true
    }
}

const actions = {
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
    modules
}