
import RestService from "./rest-service";

const ProfileService = {
    regUser,
    getProfileByUserId,
    updateProfile,
    pathProfileProgram,

    getProfile,
    patchProfileWorkout,
}

export default ProfileService

async function regUser(keycloak, user) {
    return await RestService.postRequest(keycloak, "http://localhost:8080/api/user", JSON.stringify(user))
}

async function getProfile(keyCloak) {
    return await RestService.getRequest(keyCloak, "https://case-se-java-mefit.herokuapp.com/api/profile")
}

async function getProfileByUserId(keyCloak) {

}

async function updateProfile(keyCloak, profile) {

}


async function pathProfileProgram(keyCloak,profile) {
    console.log(profile);
    // return await RestService.patchRequest(keyCloak, "https://case-se-java-mefit.herokuapp.com/api/profile/" + 
    // profile.id + "/program", JSON.stringify(profile))

}



async function patchProfileWorkout(keyCloak, profile) {
    return await RestService.patchRequest(keyCloak, "https://case-se-java-mefit.herokuapp.com/api/profile/" + profile.id + "/workout", JSON.stringify(profile))
}