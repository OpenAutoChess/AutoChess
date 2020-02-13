module.exports = {
    mode: 'universal',

    head: {
        title: 'AutoChess',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    loading: { color: 'red' },

    css: [
        '~/assets/main.scss'
    ],

    buildModules: [
        '@nuxtjs/dotenv',
    ],

    modules: [
        '@nuxtjs/axios',
    ],

    plugins: [
        { src: '~/plugins/helpers.js' },
    ],

    build: {
        extend (config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}
