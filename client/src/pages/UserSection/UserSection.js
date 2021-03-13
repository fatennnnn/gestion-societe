import React, { useEffect } from "react";

import { Route, Switch } from "react-router-dom";
import GetContratClient from "../../component/GetContratClient/GetContratClient";
import GetBonCommandeClient from "../../component/GetBonCommandeClient/GetBonCommandeClient";
import GetFactureClient from "../../component/GetFactureClient/GetFactureClient";
const UserSection = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/user-section">
          Client section
        </Route>
        <Route exact path="/user-section/Contrat">
          <GetContratClient />
        </Route>
        <Route exact path="/user-section/BonDeCommande">
          <GetBonCommandeClient />
        </Route>
        <Route exact path="/user-section/Facture">
          <GetFactureClient />
        </Route>
      </Switch>
    </div>
  );
};
export default UserSection;
