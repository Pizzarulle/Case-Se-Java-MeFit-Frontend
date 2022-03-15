import Keycloak from "keycloak-js"
import { useEffect } from "react"
import { useContext } from "react"
import { KeyCloakContext } from "../../context/KeyCloakContext"
import KeyCloakService from "../security/KeyCloak"

import UserService from "../../api/user"

const Registration = () => {

    const [keyCloak, setKeyCloak] = useContext(KeyCloakContext)

    useEffect(() => {
        const registerUser = async () => {
          const newKeyCloak = await KeyCloakService.initKeycloak(keyCloak)
          setKeyCloak(newKeyCloak)

          const user = {
              "id":keyCloak.tokenParsed.sid,
              "firstName":keyCloak.tokenParsed.given_name,
              "lastName":keyCloak.tokenParsed.family_name

          }

          UserService.regUser(keyCloak,user)
        }
        registerUser()
      }, [])

    return (
        <>
            welcome emm
            {keyCloak.token}
        </>
    )

}

export default Registration