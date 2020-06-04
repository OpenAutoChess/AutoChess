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
        { src: '~/assets/basic.scss', lang: 'scss' },
        { src: '~/assets/preloaders.scss', lang: 'scss' },
        { src: '~/assets/main.scss', lang: 'scss' },
    ],

    modules: [
        '@nuxtjs/axios',
    ],

    plugins: [
        { src: '~/plugins/helpers.js' },
        { src: '~/plugins/auth.js' },
    ],

    build: {
        extractCSS: false,
        cache: false,
        analyze: false,
        // vendor: ['axios'],
    }
}
