import styles from "./Workout.module.css";

const Workout = (props) => {
    const { id, name, type, complete, setLink } = props.workoutData;

    return (
        <div>
            <div className={styles.workoutContainer}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.floatRight}>
                            <p className={styles.id}>#{id}</p>
                            <p className={styles.complete}>Completed: <b>{complete.toString()}</b></p>

                            {props.removeWorkoutFromProfile !== undefined &&
                                <p className={styles.complete} >
                                    {complete ?
                                        <button>In Complete</button>
                                        :
                                        <button>Complete</button>
                                    }
                                    <button>Remove</button>
                                </p>
                            }{
                                props.addWorkoutToProfile !== undefined &&
                                <p className={styles.complete} > <button>Add</button></p>
                            }


                        </div>
                        <h2 className={styles.name}>{name}</h2>
                        <p className={styles.type}>{type}</p>
                        <a href={setLink} className={styles.link}>Set Link</a>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Workout;
