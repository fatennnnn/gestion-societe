import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ImSpinner9 } from "react-icons/im";
import { IconContext } from "react-icons";
import { addFicheDePaie } from "../../features/fichedePaies";
import "./AddFicheDePaie.css";
const AddFicheDePaie = ({ userId }) => {
  const ref = React.useRef();
  const clearPdf = () => {
    ref.current.value = "";
  };

  const dispatch = useDispatch();
  const [values, setValues] = useState({
    nomFichedePaie: "",
    fichedePaieUrl: "",
  });
  const { nomFichedePaie, fichedePaieUrl } = values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //test of date

  const handleDate = (e) => {
    const monthRegex = new RegExp(
      /^$|(^(0|1)$)|(^0[1-9]\/?[1-9]?[1-9]?$)|(^1[0-2]\/?[1-9]?[1-9]?$)/
    );
    let date = e.target.value;
    let prevState = nomFichedePaie;
    if (monthRegex.test(date)) {
      if (date.length === 2 && prevState.length === 1) {
        e.target.value += "/";
      }
      setValues({ ...values, [e.target.name]: e.target.value });
    } else {
      e.target.value = prevState;
    }
  };

  const { fichedePaie, fichedePaieErrors, fichedePaieStatus } = useSelector(
    (state) => state.fichedePaies
  );
  useEffect(() => {
    if (fichedePaieStatus.create === "succeded") {
      setValues({ ...values, nomFichedePaie: "" });
      clearPdf();
    }
  }, [fichedePaieStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("nomFichedePaie", nomFichedePaie);
    formData.append("userId", userId);
    formData.append("facture", fichedePaieUrl);
    dispatch(addFicheDePaie(formData));
  };
  const fileHandler = (e) => {
    setValues({ ...values, fichedePaieUrl: e.target.files[0] });
  };
  return (
    <div className="fichelist">
      <h2>Ajouter Fiche de paie</h2>
      <form>
        <div className="fichelist__fiche">
          <h5>NOM Fiche</h5>
          <input
            // type="text"
            className="input__form__fiche valid_input"
            type="month"
            name="nomFichedePaie"
            value={nomFichedePaie}
            onChange={handleChange}
          />
          <h5> Facture Fiche</h5>
          {/* <input
            type="text"
            name="factureURL"
            value={factureUrl}
            onChange={handleChange}
          /> */}
          <input
            className="input__form__fiche valid_input"
            ref={ref}
            type="file"
            name="factureUrl"
            onChange={fileHandler}
          />
        </div>
        <button className="addfiche" type="submit" onClick={handleSubmit}>
          {fichedePaieStatus.create === "loading" ? (
            <span>loading</span>
          ) : (
            <span>Ajouter</span>
          )}
        </button>
      </form>
    </div>
  );
};
export default AddFicheDePaie;
