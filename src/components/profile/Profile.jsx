import { useContext, useEffect, useState } from "react";
import UserService from "../../api/profile";
import EditProfile from "./editProfile/EditProfile";
import styles from "./Profile.module.css";
import ProfileDetails from "./profileDetails/ProfileDetails";
import { KeyCloakContext } from "../../context/KeyCloakContext";
import ProfileService from "../../api/profile";
import Loader from "../loader/Loader";

//Replace this with information for the logged in user

/**
 * Component displaying profile information for a user
 */
const Profile = () => {
  const [keycloak] = useContext(KeyCloakContext);
  const [editPage, setEditPage] = useState(false);
  const [user, setUser] = useState();
  const [profile, setProfile] = useState(null);

  const handleEditSubmit = (e) => {
    setEditPage(false);
    setProfile(e);
  };

  /**
   * Method that will run when keycloak updates and the component renders for the first time
   */
  useEffect(() => {
    const asyncWrapper = async () => {
      const { payload, success } = await ProfileService.getProfileByUserId(
        keycloak
      );
      if (success) {
        setUser({
          firstName: keycloak.tokenParsed.given_name,
          lastName: keycloak.tokenParsed.family_name,
          email: keycloak.tokenParsed.email,
          isContributor: keycloak.tokenParsed.roles.includes("MeFitt_Admin"),
          isAdmin: keycloak.tokenParsed.roles.includes("MeFitt_Contributer"),
        });
        setProfile(payload.profile);
      }
    };
    asyncWrapper();
  }, [keycloak, profile]);

  return (
    <>
      {!user ? (
        <Loader />
      ) : editPage ? (
        <EditProfile user={profile} editSubmitted={handleEditSubmit} />
      ) : (
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

          <ProfileDetails
            userDetails={user}
            profileDetails={profile}
          />

          <div className={styles.editColumn}>
            <p>
              <span>Status:</span>{" "}
              {user.isAdmin ? (
                <>Admin</>
              ) : user.isContributor ? (
                <>Contributor</>
              ) : (
                <>User</>
              )}
            </p>

            <button onClick={() => setEditPage(true)}>Edit profile</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
