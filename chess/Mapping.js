export default class Mapping {
    map = null

    constructor() {
        this.map = {}

    }

    update(row, col, piece) {
        if (!this.map[row]) {
            this.map[row] = {}
        }
        this.map[row][col] = piece
        this.map = Object.assign({}, this.map)
    }

    isEmpty(row, col) {
        return !this.getPiece(row, col)
    }

    getPiece(row, col) {
        if (!this.map[row]) {
            this.map[row] = {}
        }
        return this.map[row][col]
    }

}
