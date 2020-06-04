import io from 'socket.io-client'

export default class Controller {

    url = null
    options = null
    connection = null

    constructor(url = '', options = {}) {
        this.url = url
        this.options = options
    }

    connect() {
        console.log('Connecting to: ' + this.url, 'With params: ', {...this.options})
        this.connection = io(this.url, this.options)
    }

    close() {
        console.log('Closing connection.')
        this.connection.close()
        this.connection = null
    }


}
