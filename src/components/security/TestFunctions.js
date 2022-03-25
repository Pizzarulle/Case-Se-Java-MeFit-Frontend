
const TestService = {
    testuser,
    testadmin,
}

export default TestService;

async function testuser(keycloak) {
    console.log(keycloak)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${keycloak.token}`)
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    try {
        const response = await fetch("http://localhost:8080/api/user/", requestOptions)
        console.log(response)
        let json = await response.text()
        console.log(json)
    } catch (error) {
    }
}

async function testadmin(keycloak) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${keycloak.token}`)
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    try {
        const response = await fetch("http://localhost:8080/security/admin", requestOptions)
        console.log(response)
        let json = await response.text()
        console.log(json)
    } catch (error) {
    }
}
