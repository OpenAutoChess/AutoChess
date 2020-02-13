import Mapping from '../Mapping'

export default class Controller {

    mapping = null
    players = []
    activeCell = null
    activePaths = []
    nextMove = 0

    constructor() {
        this.mapping = new Mapping()

    }

    addPlayer(player) {
        this.players.push(player)
    }

    addPiece(player, piece) {
        this.mapping.update(piece.row, piece.col, piece)
        player.addPiece(piece)
    }

    getPiece(row, col) {
        return this.mapping.getPiece(row, col)
    }

    setActiveCell(row, col) {
        let piece = this.getPiece(row, col)
        if (this.isActivePath(row, col) && this.players[this.nextMove].current) {
            this.move(this.activeCell.row, this.activeCell.col, row, col)
        }

        this.activeCell = (piece && piece.player.current) ? {
            row: row,
            col: col
        } : null

        this.updateActivePaths(piece)
    }

    updateActivePaths(piece) {
        this.activePaths = (piece && piece.player.current) ? piece.getActivePaths(this.mapping) : []
    }

    isActivePath(row, col) {
        return this.activePaths.includes(`${row}_${col}`)
    }

    move(fromRow, fromCol, toRow, toCol) {
        this.nextMove = (this.nextMove + 1)%this.players.length
        let piece = this.getPiece(fromRow, fromCol)
        let target = this.getPiece(toRow, toCol)

        if (target) {
            target.kill()
            this.mapping.update(toRow, toCol, null)
        }

        piece.moveTo(toRow, toCol)
        this.mapping.update(toRow, toCol, piece)
        this.mapping.update(fromRow, fromCol, null)
    }

}
