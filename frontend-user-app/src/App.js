import React from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import CreateUser from "./components/CreateUser";
import UsersList from "./components/UsersList";
import EditUser from "./components/EditUser";

function App() {
  return (
    <div className="App">
      <Nav />
      <br />
      <Switch>
        <Route path="/" exact>
          <UsersList />
        </Route>
        <Route path="/create-user" exact>
          <CreateUser />
        </Route>
        <Route path="/edit-user/:id">
          <EditUser />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
