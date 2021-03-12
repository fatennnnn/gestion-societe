import React, { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { logout } from "../../features/auth";
import { useSelector, useDispatch } from "react-redux";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";
import "./Navbar.css";
const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLog = () => {
    dispatch(logout());
  };
  const adminMenu = (
    <Fragment>
      <div
        className={click ? "navbar__first-menu active" : "navbar__first-menu"}
        onClick={closeMobileMenu}
      >
        <Link className="navbar__link" to="/admin-section/facturation">
          <span>facturation</span>
        </Link>
        <Link
          className="navbar__link"
          to="/admin-section/contrat-bondecommande"
        >
          <span>contrat-bondecommande</span>
        </Link>
        <Link
          className="navbar__link"
          to="/admin-section/gestion-des-payes-salariées"
        >
          <span>gestion des payes salariées</span>
        </Link>
        <Link className="navbar__link" to="/admin-section/ajout-employe">
          <span>ajout-employe</span>
        </Link>
        <Link className="navbar__link" to="/admin-section/chat-room">
          <span>chat</span>
        </Link>
      </div>
      <Link className="navbar__link" to="/">
        <span onClick={handleLog}>Déconnexion</span>
      </Link>

      <div className="navbar__second-menu ">
        <div className="mobile-menu" onClick={handleClick}>
          {click ? (
            <IconContext.Provider value={{ className: "menu-icone" }}>
              <div>
                <IoClose />
              </div>
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ className: "menu-icone" }}>
              <div>
                <HiMenuAlt2 />
              </div>
            </IconContext.Provider>
          )}
        </div>
      </div>
    </Fragment>
  );
  const homeMenu = (
    <Fragment>
      <Link
        className={
          location.pathname === "/"
            ? "navbar__link navbar__link--active"
            : "navbar__link"
        }
        to="/"
      >
        <span onClick={closeMobileMenu}>Acceuil</span>
      </Link>

      <div
        className={click ? "navbar__first-menu active" : "navbar__first-menu"}
        onClick={closeMobileMenu}
      >
        <Link
          className={
            location.pathname === "/contact"
              ? "navbar__link navbar__link--mobile navbar__link--active"
              : "navbar__link navbar__link--mobile"
          }
          to="/contact"
        >
          <span onClick={closeMobileMenu}>Contact</span>
        </Link>

        <Link
          className={
            location.pathname === "/nos-agence"
              ? "navbar__link navbar__link--mobile navbar__link--active"
              : "navbar__link navbar__link--mobile"
          }
          to="/nos-agence"
        >
          <span onClick={closeMobileMenu}>Nos Agence</span>
        </Link>
        <Link
          className={
            location.pathname === "/cgu"
              ? "navbar__link navbar__link--mobile navbar__link--active"
              : "navbar__link navbar__link--mobile"
          }
          to="/cgu"
        >
          <span onClick={closeMobileMenu}>CGU</span>
        </Link>
        <Link
          className={
            location.pathname === "/cgv"
              ? "navbar__link navbar__link--mobile navbar__link--active"
              : "navbar__link navbar__link--mobile"
          }
          to="/cgv"
        >
          <span onClick={closeMobileMenu}>CGV</span>
        </Link>
        <Link
          className={
            location.pathname === "/connexion"
              ? "navbar__link navbar__link--mobile navbar__link--active"
              : "navbar__link navbar__link--mobile"
          }
          to="/connexion"
        >
          <span onClick={closeMobileMenu}>Mon compte</span>
        </Link>
      </div>
      <div className="navbar__second-menu ">
        <div className="mobile-menu" onClick={handleClick}>
          {click ? (
            <IconContext.Provider value={{ className: "menu-icone" }}>
              <div>
                <IoClose />
              </div>
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ className: "menu-icone" }}>
              <div>
                <HiMenuAlt2 />
              </div>
            </IconContext.Provider>
          )}
        </div>
      </div>
    </Fragment>
  );
  const employeMenu = (
    <Fragment>
      <Link className="navbar__link" to="/worker-section/ficheDePaie">
        <span>Fiche de paie</span>
      </Link>

      <Link className="navbar__link" to="/">
        <span onClick={handleLog}>Déconnexion</span>
      </Link>
    </Fragment>
  );
  const userMenu = (
    <Fragment>
      <Link className="navbar__link" to="/user-section/Contrat">
        <span>Contrat</span>
      </Link>
      <Link className="navbar__link" to="/user-section/BonDeCommande">
        <span>Bon de Commande</span>
      </Link>
      <Link className="navbar__link" to="/">
        <span onClick={handleLog}>Déconnexion</span>
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
