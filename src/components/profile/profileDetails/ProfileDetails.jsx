import styles from "./ProfileDetails.module.css";

/**
 * Component to render info about the user to show 
 * @param {*} param0 contains user and profile data to show
 * @returns 
 */
const ProfileDetails = ({ userDetails, profileDetails }) => {
  const { firstName, lastName, email } = userDetails;

  return (
    <>
      {profileDetails && (
        <div className={styles.personalDetailsContainer}>
          <h2>
            {firstName} {lastName}
          </h2>

          <p>
            <span>Email:</span> {email}
          </p>
          <p>
            <span>Weight:</span>{" "}
            {profileDetails.weight && profileDetails.weight} kg
          </p>
          <p>
            <span>Height:</span>{" "}
            {profileDetails.height && profileDetails.height} cm
          </p>
          <p>
            <span>Medical conditions:</span>
            {profileDetails.medicalConditions
              ? profileDetails.medicalConditions
              : "None"}
          </p>
          <p>
            <span>Disabilities:</span>{" "}
            {profileDetails.disabilities ? profileDetails.disabilities : "None"}
          </p>
        </div>
      )}
    </>
  );
};

export default ProfileDetails;
