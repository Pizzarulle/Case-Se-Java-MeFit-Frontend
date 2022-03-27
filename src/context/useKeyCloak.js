import Keycloak from "keycloak-js";
import { createContext, useContext, useState } from "react";

const KCContext = createContext()

export const useKC = () =>{
    return useContext(KCContext)
}

const KCProvider = ({children}) =>{

    const [kc, setKC] = useState(new Keycloak({
        url: "https://keycloak-authentication-server.herokuapp.com/auth/",
        realm: "mefitt",
        clientId: "mefitt-app"
    }))

    const state = {
        kc,
        setKC
    }

    return(
        <KCContext.Provider value={state}>
            {children}
        </KCContext.Provider>
    )
}
export default KCProvider