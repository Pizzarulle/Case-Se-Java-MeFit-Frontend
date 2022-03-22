import { useEffect } from "react"
import { useContext } from "react"
import { KeyCloakContext } from "../../context/KeyCloakContext"

import UserService from "../../api/user"

const Registration = () => {

    const [keyCloak, setKeyCloak] = useContext(KeyCloakContext)

    useEffect(() => {
        const registerUser = async () => {
            const user = {
                "id": keyCloak.tokenParsed.sid,
                "firstName": keyCloak.tokenParsed.given_name,
                "lastName": keyCloak.tokenParsed.family_name
            }

            UserService.regUser(keyCloak, user)
        }
        registerUser()
    }, [])

    return (
        <>
            <h2>Welcome </h2> <h1>{keyCloak.tokenParsed.name}</h1>  <h2> to MeFit</h2>
            <p>
                This is a welcome message
            </p>
        </>
    )

}

export default Registration