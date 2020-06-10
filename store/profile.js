export const state = () => ({
    user: null
})

export const getters = {
    GET_USER: (store) => store.user
}

export const mutations = {
    SET_USER: (store, payload) => {
        store.user = payload
    }
}

export const actions = {
    async fetchUser(store, payload) {
        try {
            store.commit('SET_USER', await this.$axios.$get(this.$api.auth.url('user'), payload))
        } catch(e) {
            store.dispatch('auth/logout', null, { root: true })
        }

    }
}
