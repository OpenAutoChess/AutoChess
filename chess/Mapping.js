export default class Mapping {
    map = {}

    constructor() {

    }

    update(row, col, piece) {
        if (!this.map[row]) {
            this.map[row] = {}
        }
        this.map[row][col] = piece
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
