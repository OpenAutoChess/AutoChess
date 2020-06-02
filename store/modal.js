export const state = () => ({
    data: {},
})

export const getters = {
    IS_OPEN: (store) => (modal) => store.data[modal] && store.data[modal].isOpen,
    GET_MODAL_DATA: (store) => (modal) => store.data[modal]
}

export const mutations = {
    SHOW_MODAL: (store, modal) => {
        store.data[modal] = Object.assign(store.data[modal], { isOpen: true })
        store.data = Object.assign({}, store.data)
    },
    CLOSE_MODAL: (store, modal) => {
        store.data[modal] = Object.assign(store.data[modal], { isOpen: false })
        store.data = Object.assign({}, store.data)
    },
    SET_MODAL_DATA: (store, payload) => {
        store.data[payload.modal] = Object.assign({ isOpen: store.data[payload.modal] && store.data[payload.modal].isOpen }, payload.data)
    }
}
