import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ImSpinner9 } from "react-icons/im";
import { IconContext } from "react-icons";
import { addFacture } from "../../features/factures";
import "./AddFacture.css";
const AddFacture = ({ userId }) => {
  const ref = React.useRef();
  const clearPdf = () => {
    ref.current.value = "";
  };

  const dispatch = useDispatch();
  const [values, setValues] = useState({
    nomfacture: "",
    factureUrl: "",
  });
  const { nomfacture, factureUrl } = values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const { facture, factureErrors, factureStatus } = useSelector(
    (state) => state.factures
  );
  useEffect(() => {
    if (factureStatus.create === "succeded") {
      setValues({ ...values, nomfacture: "" });
      clearPdf();
    }
  }, [factureStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("nomfacture", nomfacture);
    formData.append("userId", userId);
    formData.append("facture", factureUrl);
    dispatch(addFacture(formData));
  };
  const fileHandler = (e) => {
    setValues({ ...values, factureUrl: e.target.files[0] });
  };
  return (
    <div className="factureliste">
      <h2>Ajouter Facture</h2>
      <form>
        <div className="factureliste__facture">
          <h5>Nom Facture</h5>
          <input
            className="input___form valid_input"
            type="text"
            name="nomfacture"
            value={nomfacture}
            onChange={handleChange}
          />
          <h5>Importer Facture </h5>

          <input
            className="input___form valid_input"
            ref={ref}
            type="file"
            name="factureUrl"
            onChange={fileHandler}
          />
        </div>
        <button className="addfacture" type="submit" onClick={handleSubmit}>
          {factureStatus.create === "loading" ? (
            <span>loading</span>
          ) : (
            <span>Ajouter</span>
          )}
        </button>
      </form>
    </div>
  );
};
export default AddFacture;
