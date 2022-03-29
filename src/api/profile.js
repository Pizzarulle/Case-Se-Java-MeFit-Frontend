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

async function regUser(keycloak, user) {
  return await RestService.postRequest(
    keycloak,
    `${API_URL}/user/${keycloak.subject}`,
    JSON.stringify(user)
  );
}

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
