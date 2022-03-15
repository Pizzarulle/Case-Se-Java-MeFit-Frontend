import { useContext, useRef, useState } from "react";
import KeyCloakAdminService from "../../api/keyCloak-admin";
import { KeyCloakContext } from "../../context/KeyCloakContext";
import User from "../user/User";

import styles from "./AdminPage.modual.css"

const AdminPage = () => {

    const [keyCloak, setKeyCloak] = useContext(KeyCloakContext)
    const [openPage, setOpenPage] = useState("")

    const [userList, setUserList] = useState([])

    const getUsers = async () => {
        const userList = await KeyCloakAdminService.getUsers(keyCloak)

        for (const user of userList) {
            user.roles = await getUserRoles(user)
        }

        setUserList(userList)
    }

    const getUserRoles = async (user) => {
        let isAdminValue = false
        let isContributorValue = false
        const userRoles = await KeyCloakAdminService.getUserRole(keyCloak, user.id)

        for (const role of userRoles) {
            if (role.name === "MeFitt_Admin")
                isAdminValue = true;
            else if (role.name === "MeFitt_Contributer")
                isContributorValue = true
        }
        return { isAdmin: isAdminValue, isContributor: isContributorValue }
    }

    return (
        <div>
            <button onClick={() => getUsers()}>Get users</button>
            {userList.map(user => {
                return (
                    <div className={styles.row} key={user.id}>
                        <div className={styles.column}>
                            <User userData={{
                                firstName: user.firstName,
                                lastName: user.familyName,
                                roles: user.roles

                            }} />
                        </div>
                        <div className={styles.column}>
                            {user.roles.isAdmin ?
                                <button onClick={() => KeyCloakAdminService.removeUserFromRole(keyCloak,user.id,"MeFitt_Admin")} >Remove admin</button>
                                :
                                <button onClick={() => KeyCloakAdminService.addUserToRole(keyCloak,user.id,"MeFitt_Admin") }>Make Admin</button>
                            }
                            {user.roles.isContributor ?
                                <button onClick={() => KeyCloakAdminService.removeUserFromRole(keyCloak,user.id,"MeFitt_Contributer")}>Remove Con</button>
                                :
                                <button onClick={() => KeyCloakAdminService.addUserToRole(keyCloak,user.id,"MeFitt_Contributer")} >Make Con</button>
                            }

                        </div>
                    </div>
                )
            }
            )}

        </div>
    )

}

export default AdminPage;

