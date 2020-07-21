const state = () => {
    return  {
        items: []
    }
}

const getters = {
    itemCount: state => {
        let count = 0
        if(!state.items) return count
        state.items.forEach(item => count += item.quantity)
        return count
    }
}

const mutations = {
    setCart(state, cart){
        Object.assign(state, cart)
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