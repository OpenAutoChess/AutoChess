import Controller from './Controller'

export default class SearchController extends Controller {

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
    accepted = false

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

        this.connection.on('found', (data) => {
            data = JSON.parse(data)
            for(let key in data) {
                data[key] = Object.assign({ accepted: false, canceled: false }, data[key])
            }
            this.found = true
            this.accepted = false
            this.clients = data
            console.log("Found event: ", data)
        })

        this.connection.on('accepted', (data) => {
            this.clients[data].accepted = true
            console.log("Accepted event: ", data)
        })

        this.connection.on('canceled', (data) => {
            this.clients[data].canceled = true
            this.accepted = true
            console.log("Canceled event: ", data)
        })

        this.connection.on('canceling', (data) => {
            console.log("Canceling event: ", data)
        })

        this.connection.on('starting', (data) => {
            console.log("Starting event: ", data)
        })

    }

    search(options) {
        this.found = false
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
        this.isSearching = false
        this.connection.emit('stop')

        clearInterval(this.interval)
        this.interval = null
        this.timer = 0
    }

    acceptGame() {
        this.accepted = true
        this.connection.emit('accept')
    }

    declineGame() {
        this.accepted = true
        this.connection.emit('cancel')
    }

}
