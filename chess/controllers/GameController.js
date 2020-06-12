import Controller from './Controller'
import * as Pieces from '../pieces/Pieces'

export default class GameController extends Controller {

    url = process.env.NODE_ENV == 'development' ? "http://localhost:3002/" : 'http://server001.autochess.kz'
    connection = null

    pieces = {}
    component = null
    activeCell = { row: null, col: null }
    currentUserId = null
    currentUserIndex = null

    mode = "Classical"
    room = null

    visible = false

    constructor(currentUserId) {
        super()
        this.currentUserId = currentUserId
    }

    getPiece(i, j) {
        try {
            return this.pieces[i][j]
        } catch (e) {
            return null
        }
    }

    move(move) {
        this.connection.emit('move', move)
    }

    start(room, options = {}) {

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
            this.visible = true
            this.nextMove = data.NextMove
            this.pieces = data.Pieces
            this.users = data.Users
            for(let i=0;i<this.users.length;++i) {
                if (this.users[i] == this.currentUserId) {
                    this.currentUserIndex = i
                    break;
                }
            }
            console.log("START", data)
        })

        this.connection.on('game-finish', (data) => {
            console.log("FINISH", data)
        })

        this.connection.on('game-move', (data) => {
            this.pieces = JSON.parse(data)
            console.log("MOVE", this.pieces)
        })

        this.connection.on('test', (data) => {
            console.log("TEST", data)
        })

    }

    setActiveCell(i, j) {
        if (this.isMove(i, j)) {
            console.log("MOVE")
            this.move({
                from: this.activeCell,
                to: { row: i, col: j }
            })
        }
        this.activeCell = {
            row: i,
            col: j
        }
    }

    isActiveCell(i, j) {
        return this.activeCell.row == i && this.activeCell.col == j
    }

    isMove(i, j) {
        if (this.isActiveCell(i, j)) {
            return false
        }
        try {
            let activePiece = this.pieces[this.activeCell.row][this.activeCell.col]
            return (activePiece && activePiece.Color == this.currentUserIndex + 1)
        } catch (e) {
            return false
        }
    }

}
