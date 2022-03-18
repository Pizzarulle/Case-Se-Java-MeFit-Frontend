const KeyCloakService = {
    initKeycloak,
    login,
    register,
    logout,

    getUserFromJWT,
    userActive
}

export default KeyCloakService;

async function initKeycloak(keyCloak) {
    await keyCloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: 'http://localhost:3000'
    })
    return keyCloak
}

async function login(keyCloak) {
    if (keyCloak === undefined)
        keyCloak = await initKeycloak(keyCloak)
    await keyCloak.login({
        redirectUri: 'http://localhost:3000',
    })
    return keyCloak
}

async function register(keyCloak) {
    if (keyCloak === undefined)
        keyCloak = await initKeycloak(keyCloak)
    keyCloak.login({
        redirectUri: 'http://localhost:3000/reg',
        action: "register"
    })
}

async function logout(keyCloak) {
    await keyCloak.logout({
        redirectUri: 'http://localhost:3000'
    })
    return keyCloak
}

function userActive(keyCloak) {
    if (keyCloak !== undefined)
        return keyCloak.authenticated
    return false
}

function getUserFromJWT(keyCloak) {
    if (keyCloak !== undefined)
        if (keyCloak.tokenParsed !== undefined)
            return keyCloak.tokenParsed.given_name
    return ""
}