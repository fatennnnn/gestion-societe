import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addContrat } from "../../features/contrats";

const AddContrat = ({ userId }) => {
  const ref = React.useRef();
  const clearPdf = () => {
    ref.current.value = "";
  };
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    nomcontrat: "",
    contratUrl: "",
  });
  const { nomcontrat, contratUrl } = values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const { contrat, contratErrors, contratStatus } = useSelector(
    (state) => state.contrats
  );
  useEffect(() => {
    if (contratStatus.create === "succeded") {
      setValues({ ...values, nomcontrat: "" });
      clearPdf();
    }
  }, [contratStatus]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("nomcontrat", nomcontrat);
    formData.append("userId", userId);
    formData.append("facture", contratUrl);
    dispatch(addContrat(formData));
  };
  const fileHandler = (e) => {
    setValues({ ...values, contratUrl: e.target.files[0] });
  };
  return (
    <div>
      <h2>Ajouter Contrat</h2>
      <form>
        <div>
          <h5>Nom de contrat</h5>
          <input
            type="text"
            name="nomcontrat"
            value={nomcontrat}
            onChange={handleChange}
          />
          <h5>contrat URL</h5>

          <input
            ref={ref}
            type="file"
            name="contratUrl"
            onChange={fileHandler}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          {contratStatus.create === "loading" ? (
            <span>loading</span>
          ) : (
            <span>Ajouter</span>
          )}
        </button>
      </form>
    </div>
  );
};
export default AddContrat;
