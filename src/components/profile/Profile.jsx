import styles from "./Profile.module.css";
import ProfileDetails from "./profileDetails/ProfileDetails";

//Replace this with information for the logged in user
const testUser = {
  firstName: "John",
  lastName: "Doe",
  weight: 70,
  height: 1.8,
  medicalConditions: null,
  disabilities: null,
  email: "john.doe@gmail.com",
  isContributor: false,
  isAdmin: false,
}

/**
 * Component displaying profile information for a user
 */
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

      <ProfileDetails profileDetailsData={testUser} />

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
