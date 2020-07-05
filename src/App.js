import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component";
import ProjectList from "./components/project-list.component";
import EditProject from "./components/edit-project.component";
import CreateProject from "./components/create-project.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar/>
      <br/>
      <Route path="/" exact component={ProjectList} />
      <Route path="/edit/:id" component={EditProject} />
      <Route path="/create" component={CreateProject} />
      <Route path="/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
