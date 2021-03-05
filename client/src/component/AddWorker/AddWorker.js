import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createWorker } from "../../features/adminWorker";
import { getAllWorkers } from "../../features/adminWorker";
import "./AddWorker.css";
const AddWorker = () => {
  const [values, setValues] = useState({
    email: "",
    motdepasse: "",
  });
  const { email, motdepasse } = values;
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const { workerErrors, workerStatut } = useSelector(
    (state) => state.adminWorker
  );
  useEffect(() => {
    if (workerStatut.create === "succeded") {
      setValues({ email: "", motdepasse: "" });
      // dispatch(getAllWorkers());
    }
  }, [workerStatut]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createWorker({ email, motdepasse }));
  };
  return (
    <div className="addworker">
      <h3>Ajouter employé</h3>
      <form>
        <div className="addworker__form__group">
          <h5>Email</h5>
          <span>
            {workerStatut.create === "failed" &&
              workerErrors.create &&
              workerErrors.create.data.filter((err) => err.param === "email")[0]
                .msg}
          </span>
          <input
            className="addworker__container__form__input valid__input"
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="addworker__form__group">
          <h5>Mot de passe</h5>
          <span>
            {workerStatut.create === "failed" &&
              workerErrors.create &&
              workerErrors.create.data.filter(
                (err) => err.param === "motdepasse"
              )[0].msg}
          </span>
          <input
            className="addworker__container__form__input valid__input"
            type="password"
            name="motdepasse"
            value={motdepasse}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="addworker__addworkerButton"
        >
          {workerStatut.create === "loading" ? (
            <span>loading</span>
          ) : (
            <span>Ajouter employé</span>
          )}
        </button>
      </form>
    </div>
  );
};
export default AddWorker;
