import React from 'react';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/AppNavbar";
import QuestionList from "./components/Question-list";
import Question from "./components/Question";
import CreateQuestion from "./components/CreateQuestion";

function App() {
  return(
    <Router>
      <div className="container">
      <Navbar/>
      <br/>
      <Switch>
      <Route path="/create" component={CreateQuestion} />
      <Route path="/:id" component={Question} />
      <Route path="/" exact component={QuestionList} />
      
      </Switch>
      </div>
    </Router>
  );
}

export default App;