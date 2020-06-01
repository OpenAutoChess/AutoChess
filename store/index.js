export const state = () => ({

})

export const actions = {
    async nuxtServerInit({ state, dispatch, commit }, { req, res, app }) {
        app.$startLoading()

    }
}
