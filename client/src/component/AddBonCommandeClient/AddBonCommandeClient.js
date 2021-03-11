import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBonCommande } from "../../features/bonCommandes";
import "./AddBonCommandeClient.css";
const AddBonCommandeClient = ({ userId }) => {
  const ref = React.useRef();
  const clearPdf = () => {
    ref.current.value = "";
  };
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    nombonCommande: "",
    bonCommandeUrl: "",
  });
  const { nombonCommande, bonCommandeUrl } = values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const { bonCommande, bonCommandeErrors, bonCommandeStatus } = useSelector(
    (state) => state.bonCommandes
  );
  useEffect(() => {
    if (bonCommandeStatus.create === "succeded") {
      setValues({ ...values, nombonCommande: "" });
      clearPdf();
    }
  }, [bonCommandeStatus]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("nombonCommande", nombonCommande);
    formData.append("userId", userId);
    formData.append("facture", bonCommandeUrl);
    dispatch(addBonCommande(formData));
  };
  const fileHandler = (e) => {
    setValues({ ...values, bonCommandeUrl: e.target.files[0] });
  };
  return (
    <div className="boncommandeliste">
      <h2>Ajouter Bon de Commande</h2>
      <form>
        <div className="boncommandeliste__boncommande">
          <h5>Nom de bon Commande</h5>
          <input
            className="input__form__bonde "
            type="text"
            name="nombonCommande"
            value={nombonCommande}
            onChange={handleChange}
          />
          <h5>bon Commande URL</h5>

          <input
            className="input__form__bonde "
            ref={ref}
            type="file"
            name="bonCommandeUrl"
            onChange={fileHandler}
          />
        </div>
        <button className="addboncommande" type="submit" onClick={handleSubmit}>
          {bonCommandeStatus.create === "loading" ? (
            <span>loading</span>
          ) : (
            <span>Ajouter</span>
          )}
        </button>
      </form>
    </div>
  );
};
export default AddBonCommandeClient;
