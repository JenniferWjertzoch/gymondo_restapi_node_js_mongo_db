const express = require("express");
const bodyParser = require("body-parser");
const expressWinston = require("express-winston");
const winston = require("winston");
const uuid = require("uuid");
const moment = require("moment");
const cors = require("cors")

const { WorkoutModel } = require("./models.js");
const database = require("./database.js");

async function createApp(config) {
  // async
  await database(config.mongoURL);

  const app = express();

  // Middleware: parse the body to json
  app.use(bodyParser.json());

  // Middleware: for request and error logging of express.js
  app.use(
    expressWinston.logger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      ),
    })
  );

  //Cors
  app.use(cors())

  // REST endpoints
  // CREATE workout
  app.post("/workouts", async (request, response) => {
    try {
      // 1. Get the data
      const workoutData = request.body;

      // 2. Validate the data
      if (!workoutData.name) {
        response.status(400).send("The body cannot be empty."); // 400 Bad Request
      } else {
        // 3. Create the object in the database
        const createdWorkout = await WorkoutModel.create({
          id: uuid.v4(),
          name: workoutData.name,
          description: workoutData.description,
          category: workoutData.category,
          startDate: new Date(workoutData.startDate),
        });

        // 4. Return what we created
        response.json(createdWorkout); // 200 OK
      }
    } catch (error) {
      console.log(error);
      // 5. Error handling
      response.status(500).send("Internal Error: Code2345");
    }
  });

  // UPDATE workout
  app.put("/workouts/:workoutId", (request, response) => {
    const workoutId = request.params.workoutId;

    const updatedWorkout = request.body;

    let newWorkout = null;
    // update
    workouts.forEach((workout, index) => {
      if (workout.id === workoutId) {
        newWorkout = {
          ...workouts[index],
          ...updatedWorkout,
        };
        workouts[index] = newWorkout;
      }
    });

    response.json(newWorkout);
  });

  // GET workout
  app.get("/workouts/:workoutId", async (request, response) => {
    try {
      // 1. Get the workout id
      const workoutId = request.params.workoutId;

      // 2. Validate
      if (!workoutId) {
        response.status(400).send("Workout id must be defined.");
      } else {
        // 3. Get workout by id
        const myWorkout = await WorkoutModel.find({
          id: workoutId,
        });

        if (!myWorkout) {
          response.status(404);
        } else {
          // 4. Send the workout back
          response.json(myWorkout);
        }
      }
    } catch (error) {
      console.log(error);
      response.status(500).send("Internal Error: ");
    }
  });

  // DELETE workout
  app.delete("/workouts/:workoutId", async (request, response) => {
    // 1. Get the workout id
    const workoutId = request.params.workoutId;

    // 2. Validate
    if (!workoutId) {
      response.status(400).send("Workout id must be defined.");
    } else {
      // 3. Get workout by id
      const myWorkout = await WorkoutModel.find({
        id: workoutId,
      });

      if (!myWorkout) {
        response.status(404);
      } else {
        const index = workouts.indexOf(workout);
        workouts.splice(index, 1);

        // 4. Send the workout back
        response.json(myWorkout);
      }
    }

    const index = workouts.indexOf(workout);
    workouts.splice(index, 1);

    response.send(workout);
  });

  // Workouts list
   app.get("/workouts", async (request, response) => {
    const filterParameters = request.query;
    let filtersQuery = {};

    // get category filters
    if (filterParameters.category) {
      const categoryList = filterParameters.category.split(",");
      const categoryFilter = { category: { $in: categoryList } };
      filtersQuery = {
        ...filtersQuery,
        ...categoryFilter,
      };
    }

    if (filterParameters.startDate) {
      try {
        const parsedDate =  moment(filterParameters.startDate);

        const dateFilter = {
          startDate: { $gte: parsedDate.startOf('month').toISOString(), $lte: parsedDate.endOf("month").toISOString() },
        };
        filtersQuery = {
          ...filtersQuery,
          ...dateFilter,
        };
      } catch (error) {
        console.error(error)
        return response.status(400).json({
          message: "please provide a valida date",
        });
      }
    }

    // for the pagination
    const skip = filterParameters.page * 20;

    // workout query
    const workoutsList = await WorkoutModel.find({ ...filtersQuery }, null, {
      skip,
      limit: 20,
    });

    response.json(workoutsList);
  });

  return app;
}

module.exports = createApp;
