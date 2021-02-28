import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createWorker } from "../../features/adminWorker";
import { getAllWorkers } from "../../features/adminWorker";

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
    <div>
      <h2>Ajouter employé</h2>
      <form>
        <div>
          <h5>Email</h5>
          <span>
            {workerStatut.create === "failed" &&
              workerErrors.create &&
              workerErrors.create.data.filter((err) => err.param === "email")[0]
                .msg}
          </span>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <h5>Mot de passe</h5>
          <span>
            {workerStatut.create === "failed" &&
              workerErrors.create &&
              workerErrors.create.data.filter(
                (err) => err.param === "motdepasse"
              )[0].msg}
          </span>
          <input
            type="text"
            name="motdepasse"
            value={motdepasse}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          {workerStatut.create === "loading" ? (
            <span>loading</span>
          ) : (
            <span>Add</span>
          )}
        </button>
      </form>
    </div>
  );
};
export default AddWorker;
