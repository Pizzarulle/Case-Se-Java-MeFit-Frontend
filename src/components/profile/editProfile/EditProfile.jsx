import React from "react";
import { useForm } from "react-hook-form";
import styles from "./EditProfile.module.css";

const EditProfile = () => {
  const {
    register,
    handleSubmit,
  } = useForm();

  //Add functionality for updating
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.editProfileContainer}
    >
      <h1>User details</h1>
      <div className={styles.group}>
        <div className={styles.row}>
          <div>
            <label>First Name</label>
            <input type="text" placeholder="John" {...register("firstName")} />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" placeholder="Doe" {...register("lastName")} />
          </div>
        </div>

        <label>Email</label>
        <input
          type="email"
          placeholder="john.doe@gmail.com"
          {...register("email")}
        />

        <label>Avatar</label>
        <input
          type="url"
          placeholder="http://..."
          {...register("avatar", {})}
        />

        <label>Password</label>
        <input type="password" {...register("Password", {})} />
      </div>

      <h1>Personal details</h1>
      <div className={styles.group}>
        <div className={styles.row}>
          <div>
            <label>Weight (in kg)</label>
            <input type="number" placeholder="73" {...register("weight", {})} />
          </div>
          <div>
            <label>Height (in meters)</label>
            <input
              type="number"
              placeholder="1.80"
              {...register("height", {})}
            />
          </div>
        </div>
        <label>Medical Condition</label>
        <textarea
          placeholder="Arthritis, High blood pressure"
          {...register("medicalCondition", {})}
        />
        <label>Disabilities</label>
        <textarea placeholder="None" {...register("disabilities", {})} />
      </div>

      <input type="submit" />
    </form>
  );
};
export default EditProfile;
