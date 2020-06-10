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
        let resp = await this.$axios.$post(this.$api.auth.url('signin'), payload)

        let token = resp.token
        store.commit('SET_TOKEN', token)
        await store.dispatch('profile/fetchUser', null, { root: true })
    },

    async signup(store, payload) {
        let resp = await this.$axios.$post(this.$api.auth.url('signup'), payload)
        this.$axios.$post(this.$api.auth.url('resend'), { email: payload.email })
    },

    async logout(store, payload) {
        store.commit('SET_TOKEN', null)
        if (process.client) {
            window.location.reload(true)
        }
    },

}
