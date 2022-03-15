import Keycloak from "keycloak-js";
import { createContext, useEffect, useState } from "react";

export const KeyCloakContext = createContext()
/**
 * Context to store the current version of KeyCloak to be used
 * @param {*} props inner elements to use keycloak
 * @returns Context provider element
 */
const KeyCloakProvider = (props) => {

    const [keyCloak, setKeyCloak] =  useState(new Keycloak({
        url: "https://keycloak-authentication-server.herokuapp.com/auth/",
        realm: "mefitt",
        clientId: "mefitt-app"
    }))

    return (
        <KeyCloakContext.Provider value={[keyCloak, setKeyCloak]}>
            {props.children}
        </KeyCloakContext.Provider>
    )
}

export default KeyCloakProvider