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
        //returns true if there is a valid session or false if there isn't.
        if (keyCloak.token !== undefined && keyCloak.token !== '') {
            return true;
        }
        return false
    }

    const isAuthenticated = hasValidSession()

    if (isAuthenticated) {
        return <Component {...props} />
    } else {
        return <Navigate replace to="/" />
    }
}

export default withAuth
