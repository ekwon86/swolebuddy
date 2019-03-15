import React, { Component } from "react";

import axios from "axios";

export default class TodaysWorkout extends Component {
  state = {
    workout: []
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/workouts").then(res => {
      console.log(res);
    });
  }

  render() {
    return <div className="todays-workout" />;
  }
}
