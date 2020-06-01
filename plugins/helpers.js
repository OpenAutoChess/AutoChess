export default function({ app, store, req }, inject) {

    // FLAGS
    inject('check', (key) => store.getters['flags/CHECK'](key))

    inject('toggle', (key) => {
        store.commit('flags/TOGGLE', key, {root: true})
    })

    inject('setFalse', (key) => {
        store.commit('flags/SET', {[key]: false}, {root: true})
    })

    inject('setTrue', (key) => {
        store.commit('flags/SET', {[key]: true}, {root: true})
    })


    // PRELOADER
    inject('isLoading', () => store.getters['preloader/IS_LOADING'])

    inject('startLoading', () => {
        store.commit('preloader/SET_PRELOADER', null, { root: true })
        store.commit('preloader/SET_LOADING', true, { root: true })
    })

    inject('stopLoading', () => {
        store.commit('preloader/SET_LOADING', false, { root: true })
    })

}
