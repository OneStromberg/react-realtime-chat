'use strict';

const Hapi = require('hapi');
const Nes = require('nes');
const Storage = require('./storage');

const HapiConfig = {
    cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
    }
};

const server = Hapi.server({
    port: 3001,
    host: 'api'
});

server.route({
    method: 'GET',
    path: '/api/messages',
    config: HapiConfig,
    handler: (request, h) => {
        var { num } = request.query;
        if (!num) {
            return h.response("Missing required fields").code(500);
        }
        try {
            return Storage.getMessages(parseInt(num));
        } catch (e) {
            return h.response("Something goes wrong").code(500);
        }
    }
});

server.route({
    method: 'POST',
    path: '/api/messages',
    config: HapiConfig,
    handler: async (request, h) => {
        const { email, message } = request.payload;
        if (!email || !message) {
            return h.response("Missing required fields").code(500);
        }
        try {
            var result = await Storage.saveMessage(email, message);
            server.broadcast('/added-message');
            return result;
        } catch (e) {
            return h.response("Something goes wrong").code(500);
        }
    }
});

server.route({
    method: 'GET',
    path: '/api/user-activity',
    config: HapiConfig,
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