export default class Player {
    pieces = []
    color = null
    current = false

    constructor(color, current) {
        this.color = color
        this.current = current
    }

    addPiece(piece) {
        piece.player = this
        this.pieces.push(piece)
    }

}
