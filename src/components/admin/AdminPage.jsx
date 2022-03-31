import { useContext, useEffect, useRef, useState } from "react";
import KeyCloakAdminService from "../../api/keyCloak-admin";
import { KeyCloakContext } from "../../context/KeyCloakContext";
import withAuth from "../security/withAuth";
import User from "../user/User";

import styles from "./AdminPage.module.css";

const AdminPage = () => {

    const [keyCloak] = useContext(KeyCloakContext)
    const [userList, setUserList] = useState([])

    /**
     * Method to get all the user from keycloak and put them in state
     */
    const getUsers = async () => {
        const userList = await KeyCloakAdminService.getUsers(keyCloak)
        for (const user of userList) {
            user.roles = await getUserRoles(user)
        }
        setUserList(userList)
    }

    /**
     * Method get specivied user back from keycloak (used to get updates)
     * @param {*} userId of user to fetch
     */
    const getUpdatedUser = async (userId) => {
        const updatedUser = await KeyCloakAdminService.getUser(keyCloak, userId)
        updatedUser.roles = await getUserRoles(updatedUser)
        updateUserInList(updatedUser)
    }

    /**
     * Method to get all the roles of a user and make them displayable
     * @param {*} user object to go through 
     * @returns new render object
     */
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

    /**
     * Method to set the users password in object and send it to the database
     * @param {*} e event with the new password inside
     * @param {*} userId of the user to update 
     */
    const updatePasswordOfUser = (e, userId) => {
        let user = userList.find(user => user.id === userId)
        user.password = e.target.value
        updateUserInList(user)
    }

    /**
     * Help method to update the state of objects in the user list 
     * @param {*} updatedUser 
     */
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
        <>
            {userList.map(user => {
                return (
                    
                    <div key={user.id} className={styles.adminContainer}  id={user.roles.isAdmin ? styles.isAdmin :user.roles.isContributor ? styles.isContributor : ""}>
                        <div className={styles.row}>
                            <div>
                                <h2>{user.firstName} {user.lastName}</h2>
                                <p>
                                    <span>Status:</span> {user.roles.isAdmin ?  "Admin" : user.roles.isContributor ? "Contributor" : "Normal User"}
                                </p>
                            </div>
                            <div> 
                                <p><span>Username: </span>{user.username}</p> 
                                <p>{user.email && <>
                                        <span>Email:</span> {user.email}
                                    </>}
                                </p>  
                            </div>

                            <div className={styles.interactiveGroup}>
                                <div className={styles.btnContainer}>
                                    <div>
                                        {user.roles.isAdmin ?
                                        <button onClick={
                                            () => KeyCloakAdminService.removeUserFromRole(keyCloak, user.id, "MeFitt_Admin")
                                                .then(() => getUpdatedUser(user.id))}>Remove Admin</button>
                                        :
                                        <button onClick={
                                            () => KeyCloakAdminService.addUserToRole(keyCloak, user.id, "MeFitt_Admin")
                                                .then(() => getUpdatedUser(user.id))}>Make Admin</button>
                                        }

                                        {user.roles.isContributor ?
                                            <button onClick={
                                                () => KeyCloakAdminService.removeUserFromRole(keyCloak, user.id, "MeFitt_Contributer")
                                                    .then(() => getUpdatedUser(user.id))}>Remove Contributor</button>
                                            :
                                            <button onClick={
                                                () => KeyCloakAdminService.addUserToRole(keyCloak, user.id, "MeFitt_Contributer")
                                                    .then(() => getUpdatedUser(user.id))}>Make Contributor</button>
                                        }
                                    </div>
                                    <button 
                                        className={styles.red} 
                                        onClick={() => KeyCloakAdminService.deleteUser(keyCloak, user.id)
                                            .then(() => getUsers())}>
                                        Delete
                                    </button>
                                </div>
                                <div className={styles.column}>
                                    <label>New password: </label>
                                    <input type="password" onChange={e => updatePasswordOfUser(e, user.id)} />
                                    <button onClick={() => KeyCloakAdminService.updateUserPassword(keyCloak, user)} >Update password</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default withAuth(AdminPage);

