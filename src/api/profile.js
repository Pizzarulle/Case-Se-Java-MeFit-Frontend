import { API_URL } from "../constants/api";
import RestService from "./rest-service";

const ProfileService = {
  regUser,
  getProfileByUserId,
  updateProfile,
  add,
  removed,
  getProfile,
};

export default ProfileService;

/**
 * Method to rend a user to the backend to be registreted / posted. 
 * @param {*} keycloak instance of keycloak that has a token
 * @param {*} user the now user object made from Keycloak token
 * @returns newly created user object with belonging profile
 */
async function regUser(keycloak, user) {
  return await RestService.postRequest(
    keycloak,
    `${API_URL}/user/${keycloak.subject}`,
    JSON.stringify(user)
  );
}

/**
 * Method to get all the profiles in the batabase
 * @param {*} keyCloak instance of keycloak that has a token
 * @returns list of all the profiles in the database
 */
async function getProfile(keyCloak) {
  return await RestService.getRequest(keyCloak, `${API_URL}/profile`);
}

async function getProfileByUserId(keyCloak) {
  const responseData = await RestService.getRequest(
    keyCloak,
    `${API_URL}/user/${keyCloak.subject}`
  );
  return responseData;
}

async function updateProfile(keyCloak, profile) {
    return await RestService.patchRequest(keyCloak, `${API_URL}/profile/${profile.id}`, JSON.stringify(profile))
}

async function add(keyCloak, profileId, data, modeltype) {
  return await RestService.patchRequest(
    keyCloak,
    `${API_URL}/profile/${profileId}/${modeltype}s`,
    JSON.stringify([data])
  );
}
async function removed(keyCloak, profileId, dataId, modeltype) {
  return await RestService.deleteRequest(
    keyCloak,
    `${API_URL}/profile/${profileId}/${modeltype}/${dataId}`
  );
}
