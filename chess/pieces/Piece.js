export default class Piece {
    row = null
    col = null

    constructor(row, col) {
        this.row = row
        this.col = col
    }

    getImage() {
        return this.player.color + this.constructor.name
    }

}
