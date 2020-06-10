import io from 'socket.io-client'

export default class Controller {

    constructor() {
        //
    }

    connect(url, options = {}) {
        return io(url, options)
    }

    disconnect(connection) {
        connection.close('closed by client')
    }

}
