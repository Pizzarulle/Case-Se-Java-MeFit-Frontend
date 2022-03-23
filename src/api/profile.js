
import RestService from "./rest-service";

const ProfileService = {
    regUser,
    updateProfile,
}

export default ProfileService

async function regUser(keycloak, user) {
    return await RestService.postRequest(keycloak, "http://localhost:8080/api/user", JSON.stringify(user))
}

async function updateProfile(keyCloak, profile) {

}
