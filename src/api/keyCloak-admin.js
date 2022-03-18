
const KeyCloakAdminService = {
    getUsers,
    getUser,
    getUserRole,
    addUserToRole,
    removeUserFromRole,
    updateUserPassword,
    deleteUser,
}
export default KeyCloakAdminService

const keyCloakUrl =
    "https://keycloak-authentication-server.herokuapp.com/auth/admin/realms/mefitt"
const meFitUrl = "http://localhost:8080"

async function getUsers(keycloak) {
    return await getRequest(keycloak, keyCloakUrl + "/users")
}

async function getUser(keycloak, userId) {
    return await getRequest(keycloak, keyCloakUrl + "/users/" + userId)
}

async function getUserRole(keycloak, userId) {
    return await getRequest(keycloak, keyCloakUrl + "/users/" + userId + "/role-mappings/realm")
}

async function addUserToRole(keycloak, userId, roleName) {
    const availableRoles = await getAvailableRoles(keycloak, userId)
    const role = availableRoles.find(role => role.name === roleName)
    return await postRequest(keycloak, keyCloakUrl + "/users/" + userId + "/role-mappings/realm", JSON.stringify([role]))
}

async function removeUserFromRole(keycloak, userId, roleName) {
    const availableRoles = await getAvailableRoles(keycloak, userId)
    const role = availableRoles.find(role => role.name === roleName)
    return await deleteRequest(keycloak, keyCloakUrl + "/users/" + userId + "/role-mappings/realm", JSON.stringify([role]))

}

/**
 * Will get all the roles that belongs to the realm mefitt
 * @param {*} keycloak 
 * @param {*} userId 
 * @returns 
 */
async function getAvailableRoles(keycloak, userId) {
    //const clientId = await getClientId(keycloak,"mefitt-app")
    return await getRequest(keycloak, keyCloakUrl + "/roles")
}


async function getClientId(keycloak, clientName) {
    const response = await getRequest(keycloak, keyCloakUrl + "/clients?clientId=" + clientName)
    return response[0].id
}

async function updateUserPassword(keycloak, user) {
    const credentialRepresentation = {
        temporary: false,
        type: "password", // TODO can be set to otp to make user have to change it
        userLabel: "Password-set-by-Admin",
        value: user.password
    }
    return putRequest(keycloak, keyCloakUrl + "/users/" + user.id + "/reset-password", JSON.stringify(credentialRepresentation))
}


async function deleteUser(keycloak, userId) {
    const responseFromMeFit = await deleteRequest(keycloak, meFitUrl + "/api/user/" + userId, undefined)
    if (responseFromMeFit.status === 200)
        return await deleteRequest(keycloak, keyCloakUrl + "/users/" + userId, undefined)
}


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

