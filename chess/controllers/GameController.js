import Controller from './Controller'

export default class GameController extends Controller {

    url = "http://localhost:3002/"
    boardComponent = null
    connection = null

    constructor() {
        super()
    }

    start(room, options) {
        this.connection = this.connect(this.url, { query: {} })
        this.connection.emit("join", room)

        this.connection.on('game-start', (data) => {
            console.log("START", data)
        })

        this.connection.on('game-finish', (data) => {
            console.log("FINISH", data)
        })

        this.connection.on('game-move', (data) => {
            console.log("MOVE", data)
        })

        this.connection.on('test', (data) => {
            console.log("TEST", data)
        })

        this.connection.emit('asd')

        console.log("STARTING ROOM: "+room)
    }


}
