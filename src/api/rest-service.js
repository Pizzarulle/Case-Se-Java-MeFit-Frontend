const RestService = {
    getRequest,
    postRequest,
    putRequest,
    patchRequest,
    deleteRequest,
}

export default RestService


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

async function postRequest(keycloak, url, body) {
    return await requestWithBody(keycloak, url, body, "POST")
}

async function putRequest(keycloak, url, body) {
    return await requestWithBody(keycloak, url, body, "PUT")
}

async function patchRequest(keycloak, url, body) {
    return await requestWithBody(keycloak, url, body, "PATCH")
}

async function deleteRequest(keycloak, url, body) {
    return await requestWithBody(keycloak, url, body, "DELETE")
}

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