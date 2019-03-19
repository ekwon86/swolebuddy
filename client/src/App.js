import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import TodaysWorkout from "./components/workouts/TodaysWorkout";
import PastWorkouts from "./components/workouts/PastWorkouts";

import "./BootswatchYeti.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <div>
            <Route exact path="/todays-workout" component={TodaysWorkout} />
            <Route exact path="/past-workouts" component={PastWorkouts} />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
