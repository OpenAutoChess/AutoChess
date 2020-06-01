export const state = () => ({
    loading: false,
    preloader: null
})

export const getters = {
    IS_LOADING: (state) => state.loading,
    GET_PRELOADER: (state) => state.preloader,
    GET_COMPONENT: (state) => () => import(`@/components/preloaders/${state.preloader}`)
}

export const mutations = {
    SET_LOADING: (state, payload) => {
        state.loading = Boolean(payload)
    },
    SET_PRELOADER: (state, payload) => {
        let preloaders = ['cube', 'blocks']
        state.preloader = preloaders[Math.floor(Math.random() * (preloaders.length))]
    },
}
