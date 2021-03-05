import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../features/auth";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, motdepasse: password, history }));
  };

  return (
    <div className="signin">
      <h1>Mon Compte</h1>

      <div className="signin__container">
        <h1>Connexion</h1>
        <form>
          <div className="signin__form__group">
            <h5>Email</h5>
            <input
              className="signin__container__form__input valid__input"
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="signin__form__group">
            <h5>Mot de passe</h5>
            <input
              className="signin__container__form__input valid__input"
              type="text"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            // value="Envoyer"
            className="signin__signInButton"
            onClick={handleSubmit}
          >
            Envoyer
          </button>
        </form>
        <p>
          Vous n'avez pas de compte?
          <Link className="signup" to="/sign-up">
            <span> S'identifier</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
