import React from "react";
import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";
import Login from "./component/Login";
import Navbar from "./component/Navbar/Navbar";
import AdminSection from "./pages/AdminSection/AdminSection";
import WorkerSection from "./pages/WorkerSection/WorkerSection";
import UserSection from "./pages/UserSection/UserSection";
import PrivateRoute from "./component/PrivateRoute";
import SignUp from "./component/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Contact from "./component/Contact/Contact";
function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
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
          <PrivateRoute path="/admin-section">
            <AdminSection />
          </PrivateRoute>
          <PrivateRoute path="/worker-section">
            <WorkerSection />
          </PrivateRoute>
          <PrivateRoute path="/user-section">
            <UserSection />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
