import Controller from './Controller'

export default class SearchController extends Controller {

    connection = null
    url = 'http://localhost:8000'
    isSearching = false
    searching = 0
    online = 0

    constructor() {
        super()
        this.connection = this.connect(this.url, { query: { mode: 'online' } })

        this.connection.on('searching-cnt', (data) => {
            if (typeof data !== "undefined") {
                this.searching = data
            }
        })

        this.connection.on('online-cnt', (data) => {
            if (typeof data !== "undefined") {
                this.online = data
            }
        })
    }

    search(options) {
        this.isSearching = true
        this.connection.emit('search', options)
    }

    stopSearch() {
        this.isSearching = false
        this.connection.emit('stop')
    }

}
