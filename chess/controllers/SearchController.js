import Controller from './Controller'

export default class SearchController extends Controller {

    constructor() {
        super('http://localhost:8000')
    }

    search(options) {
        if (this.connection) {
            this.stop()
        }
        this.options = { query: options }
        this.connect()
    }

    stop() {
        this.close()
    }

}
