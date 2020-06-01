module.exports = {
    mode: 'universal',

    head: {
        title: 'AutoChess',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Chess project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    loading: { color: 'black' },

    css: [
        '~/assets/basic.scss',
        '~/assets/preloaders.scss',
        '~/assets/main.scss'
    ],

    modules: [
        '@nuxtjs/axios',
    ],

    plugins: [
        { src: '~/plugins/helpers.js' },
    ],

    build: {
    }
}
