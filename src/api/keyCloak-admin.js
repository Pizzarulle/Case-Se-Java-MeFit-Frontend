
const KeyCloakAdminService = {
    getUsers,
    getUserRole,

    addUserToRole,
    removeUserFromRole



}



export default KeyCloakAdminService

const keyCloakUrl =
    "https://keycloak-authentication-server.herokuapp.com/auth/admin/realms/mefitt"

async function getUsers(keycloak) {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${keycloak.token}`)
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    try {
        const response = await fetch(keyCloakUrl + "/users", requestOptions)
        let json = await response.json()
        return json;
    } catch (error) {
    }
}


async function getUserRole(keycloak, userId) {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${keycloak.token}`)
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    try {
        const response = await fetch(
            keyCloakUrl + "/users/" + userId + "/role-mappings/realm", requestOptions)
        let json = await response.json()
        return json;
    } catch (error) {
    }
}

async function addUserToRole(keycloak, userId, roleName) {
    const availableRoles = await getAvailableRoles(keycloak, userId)
    const role = availableRoles.find(role => role.name === roleName)

    console.log(JSON.stringify([role]))

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${keycloak.token}`)
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify([role])
    };
    try {
        const response = await fetch(keyCloakUrl + "/users/" + userId + "/role-mappings/realm", requestOptions)
        let json = await response.json()
        return json;
    } catch (error) {
    }

}

async function removeUserFromRole(keycloak, userId, roleName) {

    const availableRoles = await getAvailableRoles(keycloak, userId)
    const role = availableRoles.find(role => role.name === roleName)

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${keycloak.token}`)
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow',
        //body: JSON.stringify([role])
    };
    try {
        const response = await fetch(keyCloakUrl + "/users/" + userId + "/role-mappings/realm", requestOptions)
        let json = await response.json()
        return json;
    } catch (error) {
    }

}

async function getAvailableRoles(keycloak, userId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${keycloak.token}`)

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    try {
        const response = await fetch(keyCloakUrl + "/users/" + userId + "/role-mappings/realm/available", requestOptions)
        let json = await response.json()
        return json;
    } catch (error) {
    }
}


async function getClientId(keyCloak, clientName) {




}
