import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { logout } from "../../features/auth";
import { useSelector, useDispatch } from "react-redux";
import Login from "../Login";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLog = () => {
    dispatch(logout());
  };
  const adminMenu = (
    <Fragment>
      <Link to="/admin-section/facturation">
        <span>facturation</span>
      </Link>
      <Link to="/admin-section/contrat-bondecommande">
        <span>contrat-bondecommande</span>
      </Link>
      <Link to="/admin-section/gestion-des-payes-salariées">
        <span>gestion des payes salariées</span>
      </Link>
      <Link to="/admin-section/ajout-employe">
        <span>ajout-employe</span>
      </Link>
      <Link to="/admin-section/chat-room">
        <span>chat</span>
      </Link>

      <Link to="/">
        <span className="navbar__link" onClick={handleLog}>
          Déconnexion
        </span>
      </Link>
    </Fragment>
  );
  const homeMenu = (
    <Fragment>
      <Link to="/">
        <span>Acceuil</span>
      </Link>
      <Link to="/contact">
        <span>Contact</span>
      </Link>
      {/* <Link to="/sign-up">
        <span>SignUp</span>
      </Link> */}
      <Link to="/nos-agence">
        <span>Nos Agence</span>
      </Link>
      <Link to="/cgu">
        <span>CGU</span>
      </Link>
      <Link to="/cgv">
        <span>CGV</span>
      </Link>
      <Link to="/connexion">
        <span>Mon compte</span>
      </Link>
    </Fragment>
  );
  const employeMenu = (
    <Fragment>
      <Link to="/worker-section/ficheDePaie">
        <span>Fiche de paie</span>
      </Link>

      <Link to="/">
        <span className="navbar__link" onClick={handleLog}>
          Déconnexion
        </span>
      </Link>
    </Fragment>
  );
  const userMenu = (
    <Fragment>
      <Link to="/user-section/Contrat">
        <span>Contrat</span>
      </Link>
      <Link to="/user-section/BonDeCommande">
        <span>Bon de Commande</span>
      </Link>
      <Link to="/">
        <span className="navbar__link" onClick={handleLog}>
          Déconnexion
        </span>
      </Link>
    </Fragment>
  );
  const navMenu = isAuthenticated
    ? user.role === "admin"
      ? adminMenu
      : user.role === "user"
      ? userMenu
      : employeMenu
    : homeMenu;

  return <div className="navbar">{navMenu}</div>;
};
export default Navbar;
