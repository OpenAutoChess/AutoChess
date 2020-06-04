export default function({ $axios }, inject) {

    inject('api', {
        async get(url, data = {}) {
            try {
                const resp = await $axios.$get(url, { query: data })
                return resp
            } catch (err) {
                console.log(err)
                return null
            }
        },
    })

}
