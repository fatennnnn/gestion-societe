import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createInformationWorker } from "../../features/adminEmploye";
const AddInformation = ({ user }) => {
  const [values, setValues] = useState({
    nom: "",
    prenom: "",
    dateembauche: "",

    datedenaissance: "",
    posteoccupe: "",
    telephone: "",
  });
  const {
    nom,
    prenom,
    dateembauche,

    datedenaissance,
    posteoccupe,
    telephone,
  } = values;
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const { adminErrors, adminStatus } = useSelector(
    (state) => state.adminEmploye
  );
  useEffect(() => {
    if (adminStatus.create === "succeded") {
      setValues({
        nom: "",
        prenom: "",
        dateembauche: "",

        datedenaissance: "",
        posteoccupe: "",
        telephone: "",
      });
    }
  }, [adminStatus]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createInformationWorker({
        user,
        nom,
        prenom,
        dateembauche,
        datedenaissance,
        posteoccupe,
        telephone,
      })
    );
  };
  return (
    <div className="addworker">
      <h3>Ajouter Information</h3>
      <form>
        <div>
          <h5>Nom</h5>

          <input type="text" name="nom" value={nom} onChange={handleChange} />
        </div>
        <div>
          <h5>Prenom</h5>

          <input
            type="text"
            name="prenom"
            value={prenom}
            onChange={handleChange}
          />
        </div>{" "}
        <div>
          <h5>date embauche</h5>

          <input
            type="text"
            name="dateembauche"
            value={dateembauche}
            onChange={handleChange}
          />
        </div>{" "}
        <div>
          <h5>date de naissance</h5>

          <input
            type="text"
            name="datedenaissance"
            value={datedenaissance}
            onChange={handleChange}
          />
        </div>{" "}
        <div>
          <h5>poste occupe</h5>

          <input
            type="text"
            name="posteoccupe"
            value={posteoccupe}
            onChange={handleChange}
          />
        </div>{" "}
        <div>
          <h5> Telephone</h5>

          <input
            type="text"
            name="telephone"
            value={telephone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          {adminStatus.create === "loading" ? (
            <span>loading</span>
          ) : (
            <span>Ajouter Information</span>
          )}
        </button>
      </form>
    </div>
  );
};
export default AddInformation;
