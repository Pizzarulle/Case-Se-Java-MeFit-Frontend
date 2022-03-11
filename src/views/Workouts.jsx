import { Component } from "react";
import Workout from "../components/workout/Workout";

const API_URL = "http://case-se-java-mefit.herokuapp.com/api";

class Workouts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workouts: null
        }
    }

    async componentDidMount() {
        await fetch(`${API_URL}/workout`)
            .then(response => response.json())
            .then(data => {
                this.setState({ workouts: data });
            });
    }

    render() {
        return (
            <div>
                <h1>Available workouts</h1>
                { !this.state.workouts
                    ? <h2>Loading...</h2>
                    : this.state.workouts.map(workout => (
                        <Workout key={ workout.id } workoutData={ workout }/>
                    ))
                }
            </div>
        );
    };
}

export default Workouts;
