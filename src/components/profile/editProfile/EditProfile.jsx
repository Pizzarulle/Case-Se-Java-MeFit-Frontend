import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import ProfileService from "../../../api/profile";
import { KeyCloakContext } from "../../../context/KeyCloakContext";
import styles from "./EditProfile.module.css";

/**
 * Component to render the page to edit a users profile details
<<<<<<< HEAD
 * @param {*} props
 * @returns
=======
 * @param {*} props 
 * @returns 
>>>>>>> 66aa8393e1035311f4bf2e7de45bbf07e1f0d853
 */
const EditProfile = (props) => {
  const [keycloak] = useContext(KeyCloakContext);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      weight: props.user.weight,
      height: props.user.height,
      medicalConditions: props.user.medicalConditions,
      disabilities: props.user.disabilities,
    },
  });

  /**
   * On form submit handler
   * @param {*} data
   */
  const onSubmit = async (data) => {
    data = { ...data, id: props.user.id };
    const res = await ProfileService.updateProfile(keycloak, data);
    props.editSubmitted(res);
  };
  const discardClick = (event) =>{
    event.preventDefault();
    props.discardClick()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.editProfileContainer}
    >
      <button
        className={styles.editAccount}
        onClick={() =>
          (window.location.href =
            "https://keycloak-authentication-server.herokuapp.com/auth/realms/mefitt/" +
            "account/?error=invalid_request&error_description=Missing+parameter%3A+response_type#/")
        }
      >
        Edit Account
      </button>
      <h1>Personal details</h1>

      <div className={styles.group}>
        <div className={styles.row}>
          <div>
            <label>Weight (in kg, rounded)</label>
            <input
              type="number"
              placeholder="73"
              {...register("weight", { required: true })}
            />
          </div>
          <div>
            <label>Height (in centimeters, rounded)</label>
            <input
              type="number"
              placeholder="1.80"
              {...register("height", { required: true })}
            />
          </div>
        </div>
        <label>Medical Condition</label>
        <textarea
          placeholder="Arthritis, High blood pressure"
          {...register("medicalConditions", {})}
        />
        <label>Disabilities</label>
        <textarea placeholder="None" {...register("disabilities", {})} />
      </div>

      <hr />

      <div className={styles.btnContainer}>
        <input type="submit" value="Save" />
        <button onClick={discardClick}>Discard</button>
      </div>
    </form>
  );
};
export default EditProfile;
