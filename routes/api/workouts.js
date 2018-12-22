const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Bring in Workout Model
const Workout = require("../../models/Workout");

// @route   GET api/workouts/test
// @desc    Tests workouts route
// @access  Public
router.get("/", (req, res) => res.json({ msg: "Workouts works!" }));

// @route   GET api/workouts
// @desc    Get all workouts
// @access  Public
router.get("/", (req, res) => {
  Workout.find()
    .sort({ date: -1 })
    .then(workouts => res.json(workouts))
    .catch(err =>
      res.status(404).json({ noworkoutsfound: "No workouts found" })
    );
});

// @route   GET api/workouts/:id
// @desc    Get workout by ID
// @access  Public
router.get("/:id", (req, res) => {
  Workout.findById(req.params.id)
    .then(workout => res.json(workout))
    .catch(err =>
      res.status(404).json({ noworkoutfound: "No workout found with that ID" })
    );
});

module.exports = router;
