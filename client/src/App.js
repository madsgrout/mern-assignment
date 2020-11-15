import React from 'react';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/AppNavbar";
import QuestionList from "./components/Question-list";
import Question from "./components/Question";

function App() {
  return(
    <Router>
      <div className="container">
      <Navbar/>
      <br/>
      <Switch>
      <Route path="/:id" component={Question} />
      <Route path="/" exact component={QuestionList} />
      
      </Switch>
      </div>
    </Router>
  );
}

export default App;