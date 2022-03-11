
export async function initKeycloak(keyCloak) {
    await keyCloak.init({
        onLoad: "login-required",
        redirectUri: 'http://localhost:3000'
    })
}




