const mongoose = require("mongoose");

const WorkoutModel = mongoose.model("Workouts", {
  id: String,
  name: String,
  description: String,
  category: {
    type: String,
    enum: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'],
  },
  startDate: Date,
});

module.exports = {WorkoutModel}
