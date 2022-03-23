
import RestService from "./rest-service";

const ProfileService = {
    regUser,
    getProfileByUserId,
    updateProfile,
    addProgramToProfile,
    removeProgramFromProfile,
}

export default ProfileService

async function regUser(keycloak, user) {
    return await RestService.postRequest(keycloak, "http://localhost:8080/api/user", JSON.stringify(user))
}

async function getProfileByUserId(keyCloak){
    
}

async function updateProfile(keyCloak, profile) {

}


async function addProgramToProfile(keyCloak,){

}

async function removeProgramFromProfile(keyCloak,){

}