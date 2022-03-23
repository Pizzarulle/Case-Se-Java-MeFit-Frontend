import { useContext, useEffect, useState } from "react";
import UserService from "../../api/profile";
import EditProfile from "./editProfile/EditProfile";
import styles from "./Profile.module.css";
import ProfileDetails from "./profileDetails/ProfileDetails";
import { KeyCloakContext } from "../../context/KeyCloakContext";

//Replace this with information for the logged in user


/**
 * Component displaying profile information for a user
 */
const Profile = () => {

  const [keycloak, setKeycloak] = useContext(KeyCloakContext)
  const [editPage, setEditPage] = useState(false)
  const [user, setUser] = useState({
    firstName: keycloak.tokenParsed.given_name,
    lastName: keycloak.tokenParsed.family_name,

    weight: 70,
    height: 1.8,
    medicalConditions: "",
    disabilities: "",

    email: keycloak.tokenParsed.email,
    isContributor: keycloak.tokenParsed.roles.includes("MeFitt_Admin"),
    isAdmin: keycloak.tokenParsed.roles.includes("MeFitt_Contributer"),
  })

  const handleEditSubmit = (e) => {
    setEditPage(false)
    setUser(e)
    UserService.updateProfile(keycloak, e)
  }


  //TODO get info from profile 
  useEffect(() => {

  }, [])


  return (
    <>
      {editPage ?
        <EditProfile user={user} editSubmitted={handleEditSubmit} />
        :
        <div
          className={styles.profileContainer}
          id={
            user.isAdmin
              ? styles.isAdmin
              : user.isContributor
                ? styles.isContributor
                : ""
          }
        >
          <img
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            alt="profile img"
          />

          <ProfileDetails profileDetailsData={user} />

          <div className={styles.editColumn}>
            <p>
              <span>Status:</span> {user.isAdmin? <>Admin</>: user.isContributor? <>Contributor</>: <>User</>}
            </p>

            <button onClick={() => setEditPage(true)}>Edit profile</button>
          </div>
        </div>

      }

    </>

  );
};

export default Profile;
