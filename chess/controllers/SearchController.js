import Controller from './Controller'

export default class SearchController extends Controller {

    gameController = null
    connection = null
    url = 'http://localhost:8000'

    isSearching = false

    searching = 0
    online = 0
    waitTime = 0

    timer = 0
    interval = null

    clients = null
    found = false
    ready = false

    constructor(gameController) {
        super()
        this.gameController = gameController
        this.startConnection()
    }

    search(options) {
        this.options = options
        this.isSearching = true
        this.connection.emit('search', options)

        this.waitTime = Math.round(10 + Math.random()*200);
        this.timer = 0
        this.interval = setInterval(() => {
            this.timer++
            this.waitTime = Math.abs(this.waitTime - (Math.random() > 0.8 ? -0.7 : 1) * Math.random() * 4)
        }, 1000)
    }

    stopSearch() {
        if (this.isSearching) {
            this.connection.emit('stop')
        }

        this.isSearching = false
        clearInterval(this.interval)
        this.interval = null
        this.timer = 0
    }

    acceptGame() {
        this.ready = true
        this.connection.emit('accept')
    }

    declineGame() {
        this.connection.emit('cancel')
        this.stopSearch()
        this.ready = true
        setTimeout(() => {
            this.found = false
        }, 1000)
    }

    startConnection() {
        this.connection = this.connect(this.url, { query: { mode: 'online' } })
        this.setHandlers()
    }

    setHandlers() {
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

        this.connection.on('found', (data) => {
            data = JSON.parse(data)
            for(let key in data) {
                data[key] = Object.assign({ accepted: false, canceled: false }, data[key])
            }
            this.isSearching = false
            this.ready = false
            this.found = true
            this.clients = data
        })

        this.connection.on('accepted', (data) => {
            this.clients[data].accepted = true
        })

        this.connection.on('canceled', (data) => {
            console.log('CANCELED')
            this.ready = true
            this.clients[data].canceled = true
        })

        this.connection.on('canceling', (data) => {
            console.log('CANCELING')
            this.stopSearch()
            setTimeout(() => {
                this.found = false
            }, 2000)
        })

        this.connection.on('starting', (data) => {
            console.log('STARTING')
            this.stopSearch()
            this.gameController.start(data)
            setTimeout(() => {
                this.found = false
            }, 1000)
        })

    }

}
