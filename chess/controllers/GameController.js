import Controller from './Controller'
import * as Pieces from '../pieces/Pieces'

export default class GameController extends Controller {

    url = "http://localhost:3002/"
    connection = null

    pieces = {}
    component = null

    mode = "Classical"
    room = null

    constructor() {
        super()
    }

    getPiece(i, j) {
        try {
            return this.pieces[i][j]
        } catch (e) {
            return null
        }
    }

    move() {

    }

    start(room, options) {

        this.room = room
        this.options = options
        this.mode = room.split('_')[0].charAt(0).toUpperCase() + room.split('_')[0].slice(1)
        this.component = () => import(`@/components/chess/boards/${(this.mode)}`)

        this.connection = this.connect(this.url, { query: {} })
        this.connection.emit("join", room)

        this.setHandlers()
    }

    setHandlers() {
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

    }

}
