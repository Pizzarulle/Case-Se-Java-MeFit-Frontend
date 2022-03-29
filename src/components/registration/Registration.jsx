import { useEffect } from "react"
import { useContext } from "react"
import { KeyCloakContext } from "../../context/KeyCloakContext"

import UserService from "../../api/profile"

const Registration = () => {

    const [keyCloak,] = useContext(KeyCloakContext)

    useEffect(() => {
        const registerUser = async () => {
            const user = {
                firstName: keyCloak.tokenParsed.given_name,
                lastName: keyCloak.tokenParsed.family_name,
                admin:false,
                contributor: false,
                password: ""
            }

            UserService.regUser(keyCloak, user)
        }
        registerUser()
    }, [keyCloak])

    return (
        <>
            <h2>Welcome </h2> <h1>{keyCloak?.tokenParsed && keyCloak.tokenParsed.name}</h1>  <h2> to MeFit</h2>
            <p>
                This is a welcome message
            </p>
        </>
    )

}

export default Registration