import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/add-user" exact>
          <AddUser />
        </Route>
        <Route path="/edit-user/:id" exact>
          <EditUser />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
