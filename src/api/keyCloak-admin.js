
const KeyCloakAdminService = {
    getUsers,
    getUserRole,
    addUserToRole,
    removeUserFromRole,
    updateUserPassword
}
export default KeyCloakAdminService

const keyCloakUrl =
    "https://keycloak-authentication-server.herokuapp.com/auth/admin/realms/mefitt"

async function getUsers(keycloak) {
    return await getRequest(keycloak, "/users")
}

async function getUserRole(keycloak, userId) {
    return await getRequest(keycloak, "/users/" + userId + "/role-mappings/realm")
}

async function addUserToRole(keycloak, userId, roleName) {
    const availableRoles = await getAvailableRoles(keycloak, userId)
    const role = availableRoles.find(role => role.name === roleName)
    return await postRequest(keycloak, "/users/" + userId + "/role-mappings/realm", JSON.stringify([role]))
}

async function removeUserFromRole(keycloak, userId, roleName) {
    const availableRoles = await getAvailableRoles(keycloak, userId)
    const role = availableRoles.find(role => role.name === roleName)
    return await deleteRequest(keycloak, "/users/" + userId + "/role-mappings/realm", JSON.stringify([role]))

}

/**
 * Will get all the roles that belongs to the realm mefitt
 * @param {*} keycloak 
 * @param {*} userId 
 * @returns 
 */
async function getAvailableRoles(keycloak, userId) {
    //const clientId = await getClientId(keycloak,"mefitt-app")
    return await getRequest(keycloak, "/roles")
}


async function getClientId(keycloak, clientName) {
    const response = await getRequest(keycloak, "/clients?clientId=" + clientName)
    return response[0].id
}

async function updateUserPassword(keycloak, user) {
    const credentialRepresentation = {
        temporary: false,
        type:"password", // TODO can be set to otp to make user have to change it
        userLabel:"Password set by Admin",
        value:user.password
    }
    return putRequest(keycloak, "/users/" + user.id + "/reset-password",JSON.stringify(credentialRepresentation))
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
        const response = await fetch(keyCloakUrl + url, requestOptions)
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
    var requestOptions = {
        method: method,
        headers: myHeaders,
        redirect: 'follow',
        body: body
    };
    try {
        const response = await fetch(keyCloakUrl + url, requestOptions)
        let json = await response.json()
        return json;
    } catch (error) {
    }
}

