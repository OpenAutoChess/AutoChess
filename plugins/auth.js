export default function({ $axios, store }, inject) {

    $axios.onRequest(config => {
        if (store.state.auth.token) {
            config.headers.common['Authorization'] = store.getters['auth/GET_TOKEN']
        }
    })

    inject('isSignedIn', () => Boolean(store.state.auth.token))

    inject('user', () => store.state.profile.user)

}
