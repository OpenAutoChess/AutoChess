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
            // FETCH USER
        } catch(e) {
            store.dispatch('auth/logout', null, { root: true })
        }

    }
}
