import React, { useEffect } from "react";

import { Route, Switch } from "react-router-dom";

import UserList from "../../component/UserList/UserList";
import UserFactList from "../../component/UserFactList/UserFactList";
import WorkerList from "../../component/WorkerList/WorkerList";
import UserListContratCommande from "../../component/UserListContratComande/UserListContratCommande";
import UserBonCommandeList from "../../component/UserBonCommandeList/UserBonCommandeList";
import UserContratList from "../../component/UserContratList/UserContratList";
import WorkerListFicheDePaie from "../../component/WorkerListFicheDePaie/WorkerListFicheDePaie";
import WorkerFicheDePaie from "../../component/WorkerFicheDePaie/WorkerFicheDePaie";
const AdminSection = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/admin-section">
          admin section
        </Route>
        <Route exact path="/admin-section/facturation">
          <UserList />
        </Route>
        <Route exact path="/admin-section/user-facts">
          <UserFactList />
        </Route>
        <Route exact path="/admin-section/contrat-bondecommande">
          <UserListContratCommande />
        </Route>
        {/* <Route exact path="/admin-section/user-contrat">
          <UserFactList />
        </Route> */}
        <Route exact path="/admin-section/user-bondecommande">
          <UserBonCommandeList />
        </Route>
        <Route exact path="/admin-section/user-contrat">
          <UserContratList />
        </Route>
        <Route exact path="/admin-section/gestion-des-payes-salariées">
          <WorkerListFicheDePaie />
        </Route>
        <Route exact path="/admin-section/employé-fiche">
          <WorkerFicheDePaie />
        </Route>
        <Route exact path="/admin-section/ajout-employe">
          <WorkerList />
        </Route>
      </Switch>
    </div>
  );
};
export default AdminSection;
