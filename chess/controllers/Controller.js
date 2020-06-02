import io from 'socket.io-client'

export default class Controller {

    connection = null

    constructor(connection) {
        this.connection = io('http://localhost:8000/')

        this.connection.on('move', (res) => {
            //
        })
    }

}
