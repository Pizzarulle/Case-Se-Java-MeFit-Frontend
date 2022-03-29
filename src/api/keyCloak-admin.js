
import { API_URL } from "../constants/api"
import RestService from "./rest-service"

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
    return await RestService.getRequest(keycloak, keyCloakUrl + "/users")
}

async function getUser(keycloak, userId) {
    return await RestService.getRequest(keycloak, keyCloakUrl + "/users/" + userId)
}

async function getUserRole(keycloak, userId) {
    return await RestService.getRequest(keycloak, keyCloakUrl + "/users/" + userId + "/role-mappings/realm")
}

async function addUserToRole(keycloak, userId, roleName) {
    const availableRoles = await getAvailableRoles(keycloak, userId)
    const role = availableRoles.find(role => role.name === roleName)
    return await RestService.postRequest(keycloak, keyCloakUrl + "/users/" + userId + "/role-mappings/realm", JSON.stringify([role]))
}

async function removeUserFromRole(keycloak, userId, roleName) {
    const availableRoles = await getAvailableRoles(keycloak, userId)
    const role = availableRoles.find(role => role.name === roleName)
    return await RestService.deleteRequest(keycloak, keyCloakUrl + "/users/" + userId + "/role-mappings/realm", JSON.stringify([role]))

}

/**
 * Will get all the roles that belongs to the realm mefitt
 * @param {*} keycloak 
 * @param {*} userId 
 * @returns 
 */
async function getAvailableRoles(keycloak, userId) {
    //const clientId = await getClientId(keycloak,"mefitt-app")
    return await RestService.getRequest(keycloak, keyCloakUrl + "/roles")
}


async function getClientId(keycloak, clientName) {
    const response = await RestService.getRequest(keycloak, keyCloakUrl + "/clients?clientId=" + clientName)
    return response[0].id
}

async function updateUserPassword(keycloak, user) {
    const credentialRepresentation = {
        temporary: false,
        type: "password", // TODO can be set to otp to make user have to change it
        userLabel: "Password-set-by-Admin",
        value: user.password
    }
    return RestService.putRequest(keycloak, keyCloakUrl + "/users/" + user.id + "/reset-password", JSON.stringify(credentialRepresentation))
}


async function deleteUser(keycloak, userId) {
    // const responseFromMeFit = await RestService.deleteRequest(keycloak,  "https://case-se-java-mefit.herokuapp.com/api/user/6a7e2cbb-dc6e-4c1a-81b1-bb298661f1a4", undefined)
    // if (responseFromMeFit.status === 200)
        return await RestService.deleteRequest(keycloak, keyCloakUrl + "/users/" + userId, undefined)
}
