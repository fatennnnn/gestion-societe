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
import Aceuil from "./component/Aceuil/Aceuil";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { CgPhone } from "react-icons/cg";
import { IconContext } from "react-icons";
function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return (
    <div className="App">
      <Router>
        <div className="app__topbar">
          <IconContext.Provider value={{ className: "top-icone" }}>
            <div>
              <CgPhone /> <p>23225215</p>
            </div>
          </IconContext.Provider>
          <div>
            <IconContext.Provider value={{ className: "top-icone" }}>
              <div>
                <FaFacebook />
              </div>
            </IconContext.Provider>
            <IconContext.Provider value={{ className: "top-icone" }}>
              <div>
                <AiFillTwitterCircle />
              </div>
            </IconContext.Provider>
            <IconContext.Provider value={{ className: "top-icone" }}>
              <div>
                <AiFillInstagram />
              </div>
            </IconContext.Provider>
            <IconContext.Provider value={{ className: "top-icone" }}>
              <div>
                <FaWhatsapp />
              </div>
            </IconContext.Provider>
          </div>
        </div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Aceuil />
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
        <footer>
          <div className="footer__content">
            <p className="copy-right">
              &copy; 2021 Copyright all right reserved.
            </p>
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
