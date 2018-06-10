'use strict';

const Hapi = require('hapi');
const Nes = require('nes');
const Storage = require('./storage');

const server = Hapi.server({
    port: 3001,
    host: 'api'
});

server.route({
    method: 'GET',
    path: '/api/messages',
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    handler: (request, h) => {
        console.log(request.query);
        var { num } = request.query;
        return Storage.getMessages(parseInt(num));
    }
});

server.route({
    method: 'POST',
    path: '/api/messages',
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    handler: async (request, h) => {
        const { email, message } = request.payload;
        if (!email || !message) {
            return h.response("Missing required fields").code(500)
        }
        var result = await Storage.saveMessage(email, message);
        server.broadcast('/added-message');
        return result;
    }
});

server.route({
    method: 'GET',
    path: '/api/user-activity',
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    handler: (request, h) => {
        console.log(request.query);
        var { email } = request.query;
        if (!email) {
            return h.response("Missing required fields").code(500)
        }
        return Storage.getLastUserActivity(email);
    }
});

const init = async () => {
    await Storage.init();
    await server.register(Nes);
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();