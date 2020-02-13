import Controller from './Controller'

import Player from '../Player'
import * as Pieces from '../pieces/Pieces'

export default class Classical extends Controller {

    constructor() {
        super()

        this.addPlayer(new Player('w', true))
        this.addPlayer(new Player('b', false))

        this.players.forEach((player, index) => {
            let row = index == 0 ? 8 : 1

            this.addPiece(player, new Pieces.Rook(row, 1))
            this.addPiece(player, new Pieces.Rook(row, 8))

            this.addPiece(player, new Pieces.Knight(row, 2))
            this.addPiece(player, new Pieces.Knight(row, 7))

            this.addPiece(player, new Pieces.Bishop(row, 3))
            this.addPiece(player, new Pieces.Bishop(row, 6))

            this.addPiece(player, new Pieces.King(row, 4))
            this.addPiece(player, new Pieces.Queen(row, 5))

            row = index == 0 ? 7 : 2
            for(let i=1;i<=8;++i) {
                this.addPiece(player, new Pieces.Pawn(row, i))
            }
        })

    }

}
