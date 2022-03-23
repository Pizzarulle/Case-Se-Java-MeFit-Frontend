import Keycloak from "keycloak-js";
import { createContext, useEffect, useState } from "react";

export const KeyCloakContext = createContext()
/**
 * Context to store the current version of KeyCloak to be used
 * @param {*} props inner elements to use keycloak
 * @returns Context provider element
 */
const KeyCloakProvider = (props) => {

    const [keyCloak, setKeyCloak] = useState(new Keycloak({
        url: "https://keycloak-authentication-server.herokuapp.com/auth/",
        realm: "mefitt",
        clientId: "mefitt-app"
    }))


    // keyCloak.onAuthSuccess = function() {  setKeyCloak({...keyCloak}) }

    // keyCloak.onAuthRefreshSuccess = function () {
    //     setKeyCloak({...keyCloak})
    // };

    useEffect(() => {
        keyCloak.init(new Keycloak({
            // onLoad: 'login-required',
            // redirectUri: 'http://localhost:3000'
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: 'http://localhost:3000/silent-check-sso.html',
            silentCheckSsoFallback: false
        }
        )).then(function (authenticated) {
            if (!authenticated) {
                console.log('Not authenticated');
            } else {
                setKeyCloak({...keyCloak})
            }
        }).catch(function () {
            console.log('Init Error');
        });
    },[])

    return (
        <KeyCloakContext.Provider value={[keyCloak, setKeyCloak]}>
            {props.children}
        </KeyCloakContext.Provider>
    )
}

export default KeyCloakProvider