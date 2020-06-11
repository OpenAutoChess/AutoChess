export default class Piece {

    constructor(color) {
        this.color = color
    }

    getImage() {
        return this.color + this.constructor.name
    }

}
