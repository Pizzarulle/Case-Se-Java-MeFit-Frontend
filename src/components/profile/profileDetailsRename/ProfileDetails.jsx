import styles from "./ProfileDetails.module.css";

const ProfileDetails = ({ profileDetailsData }) => {
  const {
    firstName,
    lastName,
    weight,
    height,
    medicalConditions,
    disabilities,
    email,
  } = profileDetailsData;

  return (
    <div className={styles.personalDetailsContainer}>
      <h2>
        {firstName} {lastName}
      </h2>

      <p>
        <span>Email:</span> {email}
      </p>

      <p>
        <span>Weight:</span> {weight} kg
      </p>

      <p>
        <span>Height:</span> {height} m
      </p>

      <p>
        <span>Medical conditions:</span>{" "}
        {medicalConditions ? medicalConditions : "None"}
      </p>

      <p>
        <span>Disabilities:</span> {disabilities ? disabilities : "None"}
      </p>
    </div>
  );
};

export default ProfileDetails;
