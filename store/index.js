const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({

})

export const actions = {
    async nuxtServerInit({ state, dispatch, commit }, { req, res, app }) {
        app.$startLoading()

        let cookies = cookieparser.parse(String(req.headers.cookie))

        let queue = [
            dispatch('auth/signinFromCookies', cookies.AuthToken)
        ]

        await Promise.all(queue)

        if (!app.$isSignedIn()) {
            res.setHeader('Set-Cookie', `AuthToken=`)
        }
    }
}
