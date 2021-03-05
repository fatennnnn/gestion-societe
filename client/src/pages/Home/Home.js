import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import SignUp from "../../component/SignUp/SignUp";
import Login from "../../component/Login";
import Contact from "../../component/Contact/Contact";
const Home = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          Aceuill
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/connexion">
          <Login />
        </Route>
        <Route exact path="/sign-up">
          <SignUp />
        </Route>
      </Switch>
    </div>
  );
};
export default Home;
