import React from "react";
import { useForm } from "react-hook-form";
import styles from "./EditProfile.module.css";

const EditProfile = (props) => {
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      weight: props.user.weight,
      height: props.user.height, medicalConditions: props.user.medicalConditions,
      disabilities: props.user.disabilities
    }
  });

  const onSubmit = (data) => {
    if (isNumeric(data.height)) {
      data = { ...data, height: isNumeric(data.height) }
      props.editSubmitted(data)
    }
  };

  function isNumeric(num) {
    num = num.replace(",", ".")
    if (num.match(/^-?\d+$/)) {
      return num
    } else if (num.match(/^\d+\.\d+$/)) {
      return num
    } else {
      return false
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.editProfileContainer}>

      <h1>Personal details</h1>
      <div className={styles.group}>
        <div className={styles.row}>
          <div>
            <label>Weight (in kg)</label>
            <input type="number" placeholder="73"
              {...register("weight", {})} />
          </div>
          <div>
            <label>Height (in meters)</label>
            <input
              type="text"
              placeholder="1.80"
              {...register("height", {})}
            />
          </div>
        </div>
        <label>Medical Condition</label>
        <textarea
          placeholder="Arthritis, High blood pressure"
          {...register("medicalConditions", {})}
        />
        <label>Disabilities</label>
        <textarea placeholder="None"
          {...register("disabilities", {})} />
      </div>

      <input type="submit" />
      <button className={styles.edit} onClick={() =>
        window.location.href =
        "https://keycloak-authentication-server.herokuapp.com/auth/realms/mefitt/" +
        "account/?error=invalid_request&error_description=Missing+parameter%3A+response_type#/"
      }>Edit Account</button>

    </form>
  );
};
export default EditProfile;
