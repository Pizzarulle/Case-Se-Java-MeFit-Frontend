import { useState } from "react";
import Program from "../components/program/Program";

//REMOVE and use api data
const test = [
  {
    id: 1,
    name: "Dumbbell",
    category: "Muscle building",
    workouts: [
      {
        id: 1,
        name: "Abdominal",
        type: "Agility",
        complete: false,
        sets:[ {
          id: 1,
          exerciseRepetition: 4,
          exercise: {
            id: 1,
            name: "Squats",
            description:
              "Squats are a functional exercise that benefit your joint and muscle health, as well as your posture",
            targetMuscleGroup:
              "Glutes,Hamstrings,Quadriceps,Adductors,Calves,Core",
            image:
              "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rw-april-jess-squat-1589233072.jpg?crop=0.667xw:1.00xh;0.148xw,0&resize=980:*",
            videoLink: "https://youtu.be/aclHkVaku9U",
          },
        },]
      },
      {
        id: 2,
        name: "Bodybuilding",
        type: "Strength",
        complete: true,
        sets: [{
          id: 1,
          exerciseRepetition: 4,
          exercise: {
            id: 1,
            name: "Squats",
            description:
              "Squats are a functional exercise that benefit your joint and muscle health, as well as your posture",
            targetMuscleGroup:
              "Glutes,Hamstrings,Quadriceps,Adductors,Calves,Core",
            image:
              "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rw-april-jess-squat-1589233072.jpg?crop=0.667xw:1.00xh;0.148xw,0&resize=980:*",
            videoLink: "https://youtu.be/aclHkVaku9U",
          },
        },]
      },
      {
        id: 3,
        name: "Legs",
        type: "Strength",
        complete: false,
        sets: [
          {
            id: 1,
            exerciseRepetition: 4,
            exercise: {
              id: 1,
              name: "Squats",
              description:
                "Squats are a functional exercise that benefit your joint and muscle health, as well as your posture",
              targetMuscleGroup:
                "Glutes,Hamstrings,Quadriceps,Adductors,Calves,Core",
              image:
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rw-april-jess-squat-1589233072.jpg?crop=0.667xw:1.00xh;0.148xw,0&resize=980:*",
              videoLink: "https://youtu.be/aclHkVaku9U",
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Dumbbell",
    category: "Muscle building",
    workouts: [
      {
        id: 1,
        name: "Abdominal",
        type: "Agility",
        complete: false,
        sets: [
          {
            id: 1,
            exerciseRepetition: 4,
            exercise: {
              id: 1,
              name: "Squats",
              description:
                "Squats are a functional exercise that benefit your joint and muscle health, as well as your posture",
              targetMuscleGroup:
                "Glutes,Hamstrings,Quadriceps,Adductors,Calves,Core",
              image:
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rw-april-jess-squat-1589233072.jpg?crop=0.667xw:1.00xh;0.148xw,0&resize=980:*",
              videoLink: "https://youtu.be/aclHkVaku9U",
            },
          },
          {
            id: 1,
            exerciseRepetition: 4,
            exercise: {
              id: 1,
              name: "Squats",
              description:
                "Squats are a functional exercise that benefit your joint and muscle health, as well as your posture",
              targetMuscleGroup:
                "Glutes,Hamstrings,Quadriceps,Adductors,Calves,Core",
              image:
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rw-april-jess-squat-1589233072.jpg?crop=0.667xw:1.00xh;0.148xw,0&resize=980:*",
              videoLink: "https://youtu.be/aclHkVaku9U",
            },
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Dumbbell",
    category: "Muscle building",
    workouts: [
      {
        id: 2,
        name: "Bodybuilding",
        type: "Strength",
        complete: true,
        sets: [{
          id: 1,
          exerciseRepetition: 4,
          exercise: {
            id: 1,
            name: "Squats",
            description:
              "Squats are a functional exercise that benefit your joint and muscle health, as well as your posture",
            targetMuscleGroup:
              "Glutes,Hamstrings,Quadriceps,Adductors,Calves,Core",
            image:
              "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rw-april-jess-squat-1589233072.jpg?crop=0.667xw:1.00xh;0.148xw,0&resize=980:*",
            videoLink: "https://youtu.be/aclHkVaku9U",
          },
        },]
      },
      {
        id: 3,
        name: "Legs",
        type: "Strength",
        complete: false,
        sets: [{
          id: 1,
          exerciseRepetition: 4,
          exercise: {
            id: 1,
            name: "Squats",
            description:
              "Squats are a functional exercise that benefit your joint and muscle health, as well as your posture",
            targetMuscleGroup:
              "Glutes,Hamstrings,Quadriceps,Adductors,Calves,Core",
            image:
              "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rw-april-jess-squat-1589233072.jpg?crop=0.667xw:1.00xh;0.148xw,0&resize=980:*",
            videoLink: "https://youtu.be/aclHkVaku9U",
          },
        },]
      },
    ],
  },
];
const Programs = () => {
  //IMPLEMENT api call when backend is ready
  const [programs, setPrograms] = useState(test);

  return (
    <>
      <h1>Available programs!</h1>

      {programs &&
        programs.map((program) => (
          <Program key={program.id} programData={program} />
        ))}
    </>
  );
};

export default Programs;
