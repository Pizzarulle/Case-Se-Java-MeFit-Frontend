const RestService = {
    getRequest,
    postRequest,
    putRequest,
    patchRequest,
    deleteRequest,
}

export default RestService


/**
 * Help method to make get requests, will make request and return data as json
 * @param {*} keycloak instance of keycloak that has a token
 * @param {*} url to endpoint to make fetch call
 * @returns response as json
 */
async function getRequest(keycloak, url) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${keycloak.token}`)
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    try {
        const response = await fetch(url, requestOptions)
        let json = await response.json()
        return json;
    } catch (error) {
    }
}

/**
 * Help method to make post requests, make use of requestWithBody function
 * @param {*} keycloak instance of keycloak that has a token
 * @param {*} url to endpoint to make fetch call
 * @param {*} body optional body to send
 * @returns see requestWithBody
 */
async function postRequest(keycloak, url, body) {
    return await requestWithBody(keycloak, url, body, "POST")
}

/**
 * Help method to make put requests, make use of requestWithBody function
 * @param {*} keycloak instance of keycloak that has a token
 * @param {*} url to endpoint to make fetch call
 * @param {*} body optional body to send
 * @returns see requestWithBody
 */
async function putRequest(keycloak, url, body) {
    return await requestWithBody(keycloak, url, body, "PUT")
}

/**
 * Help method to make path requests, make use of requestWithBody function
 * @param {*} keycloak instance of keycloak that has a token
 * @param {*} url to endpoint to make fetch call
 * @param {*} body optional body to send
 * @returns see requestWithBody
 */
async function patchRequest(keycloak, url, body) {
    return await requestWithBody(keycloak, url, body, "PATCH")
}

/**
 * Help method to make delete requests, make use of requestWithBody function
 * @param {*} keycloak instance of keycloak that has a token
 * @param {*} url to endpoint to make fetch call
 * @param {*} body optional body to send
 * @returns see requestWithBody
 */
async function deleteRequest(keycloak, url, body) {
    return await requestWithBody(keycloak, url, body, "DELETE")
}

/**
 * Help method to send fetch requests
 * @param {*} keycloak instance of keycloak that has a token
 * @param {*} url to endpoint to make fetch call
 * @param {*} body optional body to send
 * @param {*} method what kind of method is made (POST,PUT,PATCH, DELETE)
 * @returns object with status and body as json
 */
async function requestWithBody(keycloak, url, body, method) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${keycloak.token}`)
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
        method: method,
        headers: myHeaders,
        redirect: 'follow',
    };
    if (body !== undefined) {
        requestOptions.body = body
    }
    try {
        let response = await fetch(url, requestOptions)
        let json = await response.json()
        return { status: response.status, body: json };
    } catch (error) {
    }
}