import { useContext, useEffect, useRef, useState } from "react";
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

    const getUpdatedUser = async (userId) => {
        const updatedUser = await KeyCloakAdminService.getUser(keyCloak, userId)
        updatedUser.roles = await getUserRoles(updatedUser)
        updateUserInList(updatedUser)
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

    const updatePasswordOfUser = (e, userId) => {
        let user = userList.find(user => user.id === userId)
        user.password = e.target.value
        updateUserInList(user)
    }

    const updateUserInList = (updatedUser) => {
        const list = [...userList]
        const index = list.findIndex(user => user.id === updatedUser.id)
        list[index] = updatedUser
        setUserList(list)
    }

    useEffect(() => {
        getUsers()
    }, [])

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
                                <button onClick={
                                    () => KeyCloakAdminService.removeUserFromRole(keyCloak, user.id, "MeFitt_Admin")
                                        .then(() => getUpdatedUser(user.id))}
                                >Remove admin</button>
                                :
                                <button onClick={
                                    () => KeyCloakAdminService.addUserToRole(keyCloak, user.id, "MeFitt_Admin")
                                        .then(() => getUpdatedUser(user.id))}
                                >Make Admin</button>
                            }
                            {user.roles.isContributor ?
                                <button onClick={
                                    () => KeyCloakAdminService.removeUserFromRole(keyCloak, user.id, "MeFitt_Contributer")
                                        .then(() => getUpdatedUser(user.id))}
                                >Remove Con</button>
                                :
                                <button onClick={
                                    () => KeyCloakAdminService.addUserToRole(keyCloak, user.id, "MeFitt_Contributer")
                                        .then(() => getUpdatedUser(user.id))}
                                >Make Con</button>
                            }
                        </div>
                        <div>
                            <label>New password: </label>
                            <input type="password" onChange={e => updatePasswordOfUser(e, user.id)} /> <br></br>
                            <button onClick={() => KeyCloakAdminService.updateUserPassword(keyCloak, user)} >Send password</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AdminPage;

