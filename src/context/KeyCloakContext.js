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

    const updateProfile = () => {
        if (keyCloak.idTokenParsed['name']) {
            console.log(keyCloak.idTokenParsed['name']);
        } else {
        }
        console.info("????????");
    }

    keyCloak.onAuthRefreshSuccess = function () {
        updateProfile();
    };

    useEffect(() => {
        keyCloak.init(new Keycloak({
            // onLoad: 'login-required',
            // redirectUri: 'http://localhost:3000'
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: 'http://localhost:3000'
        }
        )).then(function (authenticated) {
            console.log(authenticated);
            if (!authenticated) {
                console.log('Not authenticated');
            } else {
                updateProfile();
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