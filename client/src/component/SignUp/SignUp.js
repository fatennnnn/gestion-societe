import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createClient } from "../../features/auth";
// import { useAlert } from "react-alert";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./SignUp.css";
const SignUp = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    numerosiret: "",
    detail: "",
    region: "",
    email: "",
    tva: "",
    telephone: "",
    gsm: "",
    siteweb: "",
    motdepasse: "",
  });
  const {
    nom,
    prenom,
    numerosiret,
    detail,
    region,
    email,
    tva,
    telephone,
    gsm,
    siteweb,
    motdepasse,
  } = formData;
  const dispatch = useDispatch();
  const history = useHistory();

  //   const alert = useAlert();
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //   let isAuth = useSelector((state) => state.auth.isAuthenticated);
  //   if (isAuth) {
  //     return;
  //     <Redirect to="/" />;
  //   }

  const { user, status, errors } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "succeded") {
      setFormData({
        nom: "",
        prenom: "",
        numerosiret: "",
        detail: "",
        region: "",
        email: "",
        tva: "",
        telephone: "",
        gsm: "",
        siteweb: "",
        motdepasse: "",
      });
    }
  }, [status]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      createClient({
        nom,
        prenom,
        numerosiret,
        detail,
        region,
        email,
        tva,
        telephone,
        gsm,
        siteweb,
        motdepasse,
        history,
      })
    );
  };
  return (
    <div className="mysignuppage">
      <h2>Créer un compte</h2>
      <span className="text-line"></span>

      <form className="myrealsignuppage">
        <div className="hubform-group">
          <p>Nom</p>
          {/* <span>
            {adminStatus.create === "failed" &&
              adminErrors.create &&
              adminErrors.create.data.filter((err) => err.param === "nom")[0]
                .msg}
          </span> */}
          <input
            className="hubform-group-input"
            type="text"
            name="nom"
            value={nom}
            onChange={handleChange}
          />
        </div>
        <div className="hubform-group">
          <p>Prenom</p>
          {/* <span>
            {adminStatus.create === "failed" &&
              adminErrors.create &&
              adminErrors.create.data.filter((err) => err.param === "prenom")[0]
                .msg}
          </span> */}
          <input
            className="hubform-group-input"
            type="text"
            name="prenom"
            value={prenom}
            onChange={handleChange}
          />
        </div>
        <div className="hubform-group">
          <p>Numero siret</p>
          {/* <span>
            {adminStatus.create === "failed" &&
              adminErrors.create &&
              adminErrors.create.data.filter(
                (err) => err.param === "numerosiret"
              )[0].msg}
          </span> */}
          <input
            className="hubform-group-input"
            type="text"
            name="numerosiret"
            value={numerosiret}
            onChange={handleChange}
          />
        </div>
        <div className="hubform-group">
          <p>Adresse détail</p>
          {/* <span>
            {adminStatus.create === "failed" &&
              adminErrors.create &&
              adminErrors.create.data.filter((err) => err.param === "detail")[0]
                .msg}
          </span> */}
          <input
            className="hubform-group-input"
            type="text"
            name="detail"
            value={detail}
            onChange={handleChange}
          />
        </div>
        <div className="hubform-group">
          <p>Region</p>
          {/* <span>
            {adminStatus.create === "failed" &&
              adminErrors.create &&
              adminErrors.create.data.filter((err) => err.param === "region")[0]
                .msg}
          </span> */}
          <input
            className="hubform-group-input"
            type="text"
            name="region"
            value={region}
            onChange={handleChange}
          />
        </div>
        <div className="hubform-group">
          <p>Email</p>
          {/* <span>
            {adminStatus.create === "failed" &&
              adminErrors.create &&
              adminErrors.create.data.filter((err) => err.param === "email")[0]
                .msg}
          </span> */}
          <input
            className="hubform-group-input"
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="hubform-group">
          <p>TVA</p>
          {/* <span>
            {adminStatus.create === "failed" &&
              adminErrors.create &&
              adminErrors.create.data.filter((err) => err.param === "tva")[0]
                .msg}
          </span> */}
          <input
            className="hubform-group-input"
            type="text"
            name="tva"
            value={tva}
            onChange={handleChange}
          />
        </div>
        <div className="hubform-group">
          <p>Telephone</p>
          {/* <span>
            {adminStatus.create === "failed" &&
              adminErrors.create &&
              adminErrors.create.data.filter((err) => err.param === "tva")[0]
                .msg}
          </span> */}
          <input
            className="hubform-group-input"
            type="text"
            name="telephone"
            value={telephone}
            onChange={handleChange}
          />
        </div>
        <div className="hubform-group">
          <p>GSM</p>
          {/* <span>
            {adminStatus.create === "failed" &&
              adminErrors.create &&
              adminErrors.create.data.filter((err) => err.param === "gsm")[0]
                .msg}
          </span> */}
          <input
            className="hubform-group-input"
            type="text"
            name="gsm"
            value={gsm}
            onChange={handleChange}
          />
        </div>
        <div className="hubform-group">
          <p>Site web</p>
          {/* <span>
            {adminStatus.create === "failed" &&
              adminErrors.create &&
              adminErrors.create.data.filter(
                (err) => err.param === "siteweb"
              )[0].msg}
          </span> */}
          <input
            className="hubform-group-input"
            type="siteweb"
            name="siteweb"
            value={siteweb}
            onChange={handleChange}
          />
        </div>
        <div className="hubform-group">
          <p>Mot de passe</p>
          {/* <span>
            {adminStatus.create === "failed" &&
              adminErrors.create &&
              adminErrors.create.data.filter(
                (err) => err.param === "motdepasse"
              )[0].msg}
          </span> */}
          <input
            className="hubform-group-input"
            type="text"
            name="motdepasse"
            value={motdepasse}
            onChange={handleChange}
          />
        </div>
        <div className="signup-footer">
          <button
            className="signup-Button"
            type="submit"
            onClick={handleSubmit}
          >
            {status === "loading" ? (
              <span>loading</span>
            ) : (
              <span>s'inscrire</span>
              //   (<Link to="/user-section"></Link>)
            )}
          </button>
          <p>
            Vous avez déjà un compte?
            <Link className="signIn" to="/connexion">
              <span> S'identifier</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
