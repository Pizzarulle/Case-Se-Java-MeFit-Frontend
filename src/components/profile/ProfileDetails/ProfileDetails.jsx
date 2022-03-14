import styles from "./ProfileDetails.module.css"

const ProfileDetails = () => {
    return (
        <div className={styles.personalDetailsContainer}>
        <h2>First + Last name</h2>
        <p>
          <span>Email</span> email@email.email
        </p>
     

        <p>
          <span>Weight:</span> {(70).toLocaleString} kg
        </p>
        <p>
          <span>Height:</span> 70 cm
        </p>
        <p>
          <span>Medical conditions:</span> None
        </p>
        <p>
          <span>Disabilities:</span> Wheelchair bound
        </p>

        {/* Profile informatio */}
      </div>
    );
}

export default ProfileDetails;