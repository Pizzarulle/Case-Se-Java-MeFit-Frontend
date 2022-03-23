import Keycloak from "keycloak-js";
import { useContext } from "react";
import { Navigate } from 'react-router-dom'
import { KeyCloakContext } from "../../context/KeyCloakContext";

/**
 * Component to check if a user is login / has a token, other get redirected to home
 * Will protect of limit access. 
 * @param {*} Component 
 * @returns 
 */
const withAuth = Component => props => {
    //This is used to redirect non logged in users to the login page.
    const [keyCloak, setKeyCloak] = useContext(KeyCloakContext)

    const hasValidSession = () => {
        if (keyCloak.authenticated) {
            return true;
        }
        return false
    }

    const isAuthenticated = hasValidSession()

    if (isAuthenticated && keyCloak.tokenParsed.roles.includes("MeFitt_User")) {
        if (props.restrict !== undefined) {
            if (props.restrict.role === "MeFitt_Admin" && keyCloak.tokenParsed.roles.includes("MeFitt_Admin"))
                return <Component {...props} />
            else if (props.restrict.roles === "MeFitt_Contributer" &&
                keyCloak.tokenParsed.roles.some(role => ["MeFitt_Admin", "MeFitt_Contributer"].includes(role)))
                return <Component {...props} />
            else
                return <Navigate replace to="/" />
        }
        else
            return <Component {...props} />
    } else {
        return <Navigate replace to="/" />
    }
}

export default withAuth
