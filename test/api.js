/*
 * API Tests
 *
 */

// Dependencies
const assert = require('assert');
const assertStrict = require('assert').strict;
const http = require('http');

// Port
const PORT = process.env.PORT || 5000;

// Holder for Tests
var api = {};

// Helpers
var helpers = {};
helpers.makeGetRequest = (path, callback) => {
    // Configure the request details
    const requestDetails = {
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
    const req = http.request(requestDetails, res => {
        callback(res);
    });

    req.on('error', err => {
        console.log('Error: ', err);
    });

    req.end();
};

helpers.makePostRequest = (path, callback) => {
    // Post data
    const data = JSON.stringify({
        firstName: 'Hannah',
        lastName: 'Askari',
        country: 'Kenya',
        age: 28,
    });

    // Configure the request details
    const requestDetails = {
        protocol: 'http:',
        hostname: 'localhost',
        port: PORT,
        method: 'POST',
        path: path,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
        },
    };

    // Send the request
    const req = http.request(requestDetails, res => {
        callback(res);
    });

    req.on('error', err => {
        console.log('Error: ', err);
    });

    req.write(data);

    req.end();
};

helpers.makePutRequest = (path, callback) => {
    // Post data
    const data = JSON.stringify({
        firstName: 'Stefan',
        lastName: 'Nualif',
        country: 'Botswana',
        age: 32,
    });

    // Configure the request details
    const requestDetails = {
        protocol: 'http:',
        hostname: 'localhost',
        port: PORT,
        method: 'PUT',
        path: path,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
        },
    };

    // Send the request
    const req = http.request(requestDetails, res => {
        callback(res);
    });

    req.on('error', err => {
        console.log('Error: ', err);
    });

    req.write(data);

    req.end();
};

helpers.makeDeleteRequest = (path, callback) => {
    // Configure the request details
    const requestDetails = {
        protocol: 'http:',
        hostname: 'localhost',
        port: PORT,
        method: 'DELETE',
        path: path,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Send the request
    const req = http.request(requestDetails, res => {
        callback(res);
    });

    req.on('error', err => {
        console.log('Error: ', err);
    });

    req.end();
};

// Make a request to / - read api
api['/ should respond to GET with 200'] = done => {
    helpers.makeGetRequest('/', res => {
        assert.equal(res.statusCode, 200);
        done();
    });
};

// Make a request to a random path
api['A random path should respond to GET with 404'] = done => {
    helpers.makeGetRequest('/this/path/shouldnt/exist', res => {
        assert.equal(res.statusCode, 404);
        done();
    });
};

api['/add should respond to POST with 201'] = done => {
    helpers.makePostRequest('/add', res => {
        assert.equal(res.statusCode, 201);
        done();
    });
};

api['/update/:id should responsd to PUT with 200'] = done => {
    helpers.makePutRequest('/update/58', res => {
        assert.equal(res.statusCode, 200);
        done();
    });
};

api['/delete/:id should respond to DELETE with 200'] = done => {
    helpers.makeDeleteRequest('/delete/59', res => {
        assert.equal(res.statusCode, 200);
        done();
    });
};

// Export the tests to the runner
module.exports = api;
