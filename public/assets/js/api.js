"use strict";

const BASEURL = "http://localhost:3000";

function get(uri) {
    const request = new Request(BASEURL + uri, {
        method: 'GET',
    });

    return call(request);
}

function post(uri, body) {
    const request = new Request(BASEURL + uri, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    return call(request);
}

function put(uri, body) {
    const request = new Request(BASEURL + uri, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json;',
        },
        body: JSON.stringify(body)
    });

    return call(request);
}

function remove(uri, body) {
    const request = new Request(BASEURL + uri, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json;',
        },
        body: JSON.stringify(body)
    });

    return call(request);
}

function logJson(response) {
    response.json().then(console.log);
}

function logError(error) {
    console.error(error);
}

function call(request) {
    return fetch(request);
}
