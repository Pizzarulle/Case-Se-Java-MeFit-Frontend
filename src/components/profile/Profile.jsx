import User from "../user/User";
import styles from "./Profile.module.css";
import ProfileDetails from "./ProfileDetails/ProfileDetails";

const testUser = {
  firstName: "firstName",
  lastName: "lastName",
  isContributor: false,
  isAdmin: false,
};

const Profile = () => {
  return (
    <div
      className={styles.profileContainer}
      id={
        testUser.isAdmin
          ? styles.isAdmin
          : testUser.isContributor
          ? styles.isContributor
          : ""
      }
    >
      <img
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
        alt="profile img"
      />

      <ProfileDetails />

      <div className={styles.editColumn}>
        <p>
          <span>Status:</span> user
        </p>

        <button>Edit profile</button>
      </div>
    </div>
  );
};

export default Profile;
