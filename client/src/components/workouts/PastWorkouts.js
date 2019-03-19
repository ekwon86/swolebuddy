import React, { Component } from "react";

import axios from "axios";

export default class PastWorkouts extends Component {
  componentDidMount() {
    axios.get("http://localhost:5000/api/workouts").then(res => {
      console.log(res.data);
    });
  }

  render() {
    return (
      <div className="todays-workout">
        <h1>test</h1>
      </div>
    );
  }
}
