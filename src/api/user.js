
const UserService = {
    regUser
}

export default UserService

async function regUser(keycloak, user) {
    var myHeaders = new Headers();

    const jsonBody = await JSON.stringify(user)
    myHeaders.append("Authorization", `Bearer ${keycloak.token}`)
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');
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