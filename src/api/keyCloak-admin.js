
import { API_URL } from "../constants/api"
import RestService from "./rest-service"

/**
 * All the method in this class communicate with a running KeyCloak instance
 */
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

/**
 * Method to get all the users from KeyCloak 
 * @param {*} keycloak instance of keycloak that has a token
 * @returns list of all users from KeyCloak
 */
async function getUsers(keycloak) {
    return await RestService.getRequest(keycloak, keyCloakUrl + "/users")
}

/**
 * Method to get a specific user form keycloak with the help of a userid
 * @param {*} keycloak instance of keycloak that has a token
 * @param {*} userId of the user to get 
 * @returns user object from keycloak 
 */
async function getUser(keycloak, userId) {
    return await RestService.getRequest(keycloak, keyCloakUrl + "/users/" + userId)
}

/**
 * Method to get all the realm roles a user have 
 * @param {*} keycloak instance of keycloak that has a token
 * @param {*} userId of the user to get roles from 
 * @returns list of roles user have
 */
async function getUserRole(keycloak, userId) {
    return await RestService.getRequest(keycloak, keyCloakUrl + "/users/" + userId + "/role-mappings/realm")
}

/**
 * Method to add a role to a keycloak user
 * @param {*} keycloak instance of keycloak that has a token
 * @param {*} userId of the user to edit
 * @param {*} roleName string of the role to add
 * @returns No content just status
 */
async function addUserToRole(keycloak, userId, roleName) {
    const availableRoles = await getAvailableRoles(keycloak, userId)
    const role = availableRoles.find(role => role.name === roleName)
    return await RestService.postRequest(keycloak, keyCloakUrl + "/users/" + userId + "/role-mappings/realm", JSON.stringify([role]))
}

/**
 * Method to remove a role from a keycloak user 
 * @param {*} keycloak instance of keycloak that has a token
 * @param {*} userId of the user to edit
 * @param {*} roleName name of the role to delete 
 * @returns No Content just status 
 */
async function removeUserFromRole(keycloak, userId, roleName) {
    const availableRoles = await getAvailableRoles(keycloak, userId)
    const role = availableRoles.find(role => role.name === roleName)
    return await RestService.deleteRequest(keycloak, keyCloakUrl + "/users/" + userId + "/role-mappings/realm", JSON.stringify([role]))

}

/**
 * Will get all the roles that belongs to the realm mefitt
 * @param {*} keycloak instance of keycloak that has a token
 * @returns list of all the available roles in the realm
 */
async function getAvailableRoles(keycloak) {
    //const clientId = await getClientId(keycloak,"mefitt-app")
    return await RestService.getRequest(keycloak, keyCloakUrl + "/roles")
}


async function getClientId(keycloak, clientName) {
    const response = await RestService.getRequest(keycloak, keyCloakUrl + "/clients?clientId=" + clientName)
    return response[0].id
}

/**
 * Method to update a users password / credentials
 * @param {*} keycloak instance of keycloak that has a token
 * @param {*} user object with the new password and id 
 * @returns No Content just status
 */
async function updateUserPassword(keycloak, user) {
    const credentialRepresentation = {
        temporary: false,
        type: "password", // TODO can be set to otp to make user have to change it
        userLabel: "Password-set-by-Admin",
        value: user.password
    }
    return RestService.putRequest(keycloak, keyCloakUrl + "/users/" + user.id + "/reset-password", JSON.stringify(credentialRepresentation))
}

/**
 * Method to delete a user from keycloak
 * @param {*} keycloak instance of keycloak that has a token
 * @param {*} userId of the user to delete 
 * @returns No content just status
 */
async function deleteUser(keycloak, userId) {
    // const responseFromMeFit = await RestService.deleteRequest(keycloak,  "https://case-se-java-mefit.herokuapp.com/api/user/6a7e2cbb-dc6e-4c1a-81b1-bb298661f1a4", undefined)
    // if (responseFromMeFit.status === 200)
        return await RestService.deleteRequest(keycloak, keyCloakUrl + "/users/" + userId, undefined)
}
