import Piece from './Piece'

export default class Pawn extends Piece {

    constructor(color) {
        super(color)

    }

    getActivePaths(mapping) {
        let paths = []

        if (this.isValidMove(this.row - 1, this.col)) {
            paths.push(this.getPathStr(this.row - 1, this.col))
        }

        if (this.row==7 && this.isValidMove(this.row - 2, this.col)) {
            paths.push(this.getPathStr(this.row - 2, this.col))
        }

        return paths
    }

}
