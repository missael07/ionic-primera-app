import express from 'express';

export default class Server {
    public app: express.Application;
    public port = process.env.PORT ||  3000;

    constructor() {
        this.app = express();
        this.app.set('port', this.port);
    }

    start( callback: (() => void) | undefined ) {
        this.app.listen(this.app.get('port'), "", 0, callback);
    }

}