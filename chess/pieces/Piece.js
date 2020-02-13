export default class Piece {
    row = null
    col = null
    player = null

    constructor(row, col) {
        this.row = row
        this.col = col
    }

    getImage() {
        return this.player.color + this.constructor.name
    }

    isValidMove(row, col) {
        return true
    }

    getPathStr(row, col) {
        return `${row}_${col}`
    }

    getActivePaths(mapping) {
        return []
    }

    kill() {

    }

    moveTo(row, col) {
        this.row = row
        this.col = col
    }
}
