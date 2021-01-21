const http = require('http');
const debug = require('debug')('node-angular');
const app = require('./backend/app');

const normalizePort = val => {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

const onError = error => {}


const port = process.env.PORT || 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);