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
      <h1>Mon Compte</h1>

      <div className="myrealsignuppage">
        <h1>S'inscrire</h1>
        <form>
          <div className="hubform-group">
            <h5>Nom</h5>
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
            <h5>Prenom</h5>
            {/* <span>
            {adminStatus.create === "failed" &&
              adminErrors.create &&
              adminErrors.create.data.filter((err) => err.param === "prenom")[0]
                .msg}
          </span> */}
            <input
              className="hubform-group-input valid__input "
              type="text"
              name="prenom"
              value={prenom}
              onChange={handleChange}
            />
          </div>
          <div className="hubform-group">
            <h5>Numero siret</h5>
            {/* <span>
            {adminStatus.create === "failed" &&
              adminErrors.create &&
              adminErrors.create.data.filter(
                (err) => err.param === "numerosiret"
              )[0].msg}
          </span> */}
            <input
              className="hubform-group-input valid__input "
              type="text"
              name="numerosiret"
              value={numerosiret}
              onChange={handleChange}
            />
          </div>
          <div className="hubform-group">
            <h5>Adresse détail</h5>
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
            <h5>Region</h5>
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
            <h5>Email</h5>
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
            <h5>TVA</h5>
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
            <h5>Telephone</h5>
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
            <h5>GSM</h5>
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
            <h5>Site web</h5>
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
            <h5>Mot de passe</h5>
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
          <button
            className="signup-Button"
            type="submit"
            onClick={handleSubmit}
          >
            {status === "loading" ? (
              <span>loading</span>
            ) : (
              <span>S'inscrire</span>
              //   (<Link to="/user-section"></Link>)
            )}
          </button>
        </form>
        <p>
          Vous avez déjà un compte?
          <Link className="signIn" to="/connexion">
            <span>Connecter</span>
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
