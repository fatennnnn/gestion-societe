import React, { useEffect } from "react";
import { getAllUsers } from "../../features/adminSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner9 } from "react-icons/im";
import { IconContext } from "react-icons";
// import UserFactList from "../UserFactList/"
import "./UserListContratCommande.css";
const UserListContratCommande = () => {
  //   const dispactch = useDispatch();
  const dispatch = useDispatch();

  let isAuth = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (isAuth) {
      dispatch(getAllUsers());
    }
  }, [isAuth]);
  const { users, adminStatus, adminErrors } = useSelector(
    (state) => state.admin
  );
  return (
    <div className="list__contrat__bondecommande">
      <h2>Contrat - Bon de commande</h2>

      {adminStatus.getAll === "loading" ? (
        <IconContext.Provider value={{ className: "spinner--large" }}>
          <div>
            <ImSpinner9 />
          </div>
        </IconContext.Provider>
      ) : adminStatus.getAll === "failed" ? (
        <h3>quelque chose s'est mal passe</h3>
      ) : adminStatus.getAll === "succeded" && users.length > 0 ? (
        users && users.length > 0 ? (
          users.map((user) => (
            <div className="user__cont__bon" key={user._id}>
              <h5>
                {user.nom} {user.prenom}
              </h5>
              <div className="link__cont__bon">
                <Link
                  className="linkcontbon"
                  to={{
                    pathname: "/admin-section/user-bondecommande",
                    state: { user },
                  }}
                >
                  <span>view bon Commande </span>
                </Link>
                <Link
                  className="linkcontbon"
                  to={{
                    pathname: "/admin-section/user-contrat",
                    state: { user },
                  }}
                >
                  <span>view Contrat </span>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <h3>il n'y a pas de clients</h3>
        )
      ) : (
        <h3>Pas de Client</h3>
      )}
    </div>
  );
};
export default UserListContratCommande;
