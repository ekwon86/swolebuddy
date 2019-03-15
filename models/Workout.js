const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WorkoutSchema = new Schema({
  bodypart: {
    type: String
  },
  workout: {
    type: String
  },
  imgUrl: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Workout = mongoose.model("workout", WorkoutSchema);
