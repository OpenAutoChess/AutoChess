export default function({  }, inject) {

    inject('api', {
        auth: {
            baseUrl: 'http://auth.autochess.kz',
            prefix: '/api/users',
            urls: {
                signup: '/register/',
                signin: '/auth/',
                user: '/profile/',
                resend: '/send-message/',
            },
            url(key) {
                return this.baseUrl + this.prefix + this.urls[key]
            }
        }
    })

}
