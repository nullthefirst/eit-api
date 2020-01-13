/*
 * API Tests
 *
 */

// Dependencies
const assert = require('assert');
const assertStrict = require('assert').strict;
const http = require('http');

const PORT = process.env.PORT || 5000;

// Holder for Tests
var api = {};

// Helpers
var helpers = {};
helpers.makeGetRequest = (path, callback) => {
    // Configure the request details
    var requestDetails = {
        protocol: 'http:',
        hostname: 'localhost',
        port: PORT,
        method: 'GET',
        path: path,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Send the request
    var req = http.request(requestDetails, res => {
        callback(res);
    });

    req.on('error', err => {
        console.log('Error: ', err);
    });

    req.end();
};

// Make a request to /ping
api['/ should respond to GET with 200'] = done => {
    helpers.makeGetRequest('/', res => {
        assert.equal(res.statusCode, 200);
        done();
    });
};

// // Make a request to /api/users
// api['/api/users should respond to GET with 400'] = done => {
//     helpers.makeGetRequest('/api/users', res => {
//         assert.equal(res.statusCode, 400);
//         done();
//     });
// };

// Make a request to a random path
api['A random path should respond to GET with 404'] = done => {
    helpers.makeGetRequest('/this/path/shouldnt/exist', res => {
        assert.equal(res.statusCode, 404);
        done();
    });
};

// Export the tests to the runner
module.exports = api;
