
const ProfileService = {
    regUser,
    updateProfile,
}

export default ProfileService

async function regUser(keycloak, user) {
    var myHeaders = new Headers();

    const jsonBody = await JSON.stringify(user)
    myHeaders.append("Authorization", `Bearer ${keycloak.token}`)
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: jsonBody
    };
    try {
        const response = await fetch("http://localhost:8080/api/user", requestOptions)
        console.log(response)
        let json = await response.json()
        console.log(json)
    } catch (error) {
    }
}

async function updateProfile(keyCloak,profile){

    console.log(profile);
}



