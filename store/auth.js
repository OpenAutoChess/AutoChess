import Cookies from 'js-cookie'

export const state = () => ({
    token: null,
})

export const getters = {
    GET_TOKEN: (state) => state.token,
}

export const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
        if (token) {
            Cookies.set('AuthToken', token, { expires: 3 })
        } else {
            Cookies.remove('AuthToken')
        }
    },
}

export const actions = {

    async signinFromCookies(store, token) {
        store.commit('SET_TOKEN', token)
        await store.dispatch('profile/fetchUser', null, { root: true })
    },

    async signin(store, payload) {
        // TODO: GET TOKEN
        store.commit('SET_TOKEN', token)
        await store.dispatch('profile/fetchUser', null, { root: true })
    },

    async signup(store, payload) {
        // TODO: SIGNUP
    },

    async verify(store, payload) {
        //
    },

    async resetVerification(store, payload) {
        //
    },

    async logout(store, payload) {
        store.commit('SET_TOKEN', null)
        if (process.client) {
            window.location.reload(true)
        }
    },

}
