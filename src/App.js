import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Git from "./git";
const App = () => (
  <Router>
    <Git />
  </Router>
);

export default App;
