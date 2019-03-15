import React, { Component } from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";

import axios from "axios";

export default class TodaysWorkout extends Component {
  state = {
    workout: "",
    bodyPart: ""
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/workouts/todaysworkout").then(res => {
      console.log(res.data);
      const incomingWorkout = res.data.workout;
      const incomingBodyPart = res.data.bodypart;
      this.setState({
        workout: incomingWorkout,
        bodyPart: incomingBodyPart
      });
    });
  }

  render() {
    return (
      <div className="todays-workout">
        <h5 className="body-part">{this.state.bodyPart}</h5>
        <p>{ReactHtmlParser(this.state.workout)}</p>
      </div>
    );
  }
}
