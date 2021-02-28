import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../features/auth";
import { Link, Redirect } from "react-router-dom";
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
    <div>
      <form>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>
        <label>
          Mot de passe:
          <input
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Envoyer" onClick={handleSubmit} />
      </form>
      <p>
        Vous n'avez pas de compte?
        <Link to="/sign-up">
          <span> S'identifier</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
