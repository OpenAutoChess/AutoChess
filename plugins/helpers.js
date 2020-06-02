export default function({ app, store, req }, inject) {

    // PRELOADER
    inject('isLoading', () => store.getters['preloader/IS_LOADING'])

    inject('startLoading', () => {
        store.commit('preloader/SET_PRELOADER', null, { root: true })
        store.commit('preloader/SET_LOADING', true, { root: true })
    })

    inject('stopLoading', () => {
        store.commit('preloader/SET_LOADING', false, { root: true })
    })

    // Modals
    inject('isOpen', (modal) => store.getters['modal/IS_OPEN'](modal))

    inject('showModal', (modal, options = {}) => {
        store.commit('modal/SET_MODAL_DATA', { modal: modal, data: {...options} })
        store.commit('modal/SHOW_MODAL', modal)
    })

    inject('closeModal', (modal, clear = true) => {
        store.commit('modal/CLOSE_MODAL', modal)
        if (clear) {
            store.commit('modal/SET_MODAL_DATA', { modal: modal, data: {} })
        }
    })

}
