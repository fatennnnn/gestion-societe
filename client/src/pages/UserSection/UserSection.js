import React, { useEffect } from "react";

import { Route, Switch } from "react-router-dom";
import GetContratClient from "../../component/GetContratClient/GetContratClient";
import GetBonCommandeClient from "../../component/GetBonCommandeClient/GetBonCommandeClient";
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
      </Switch>
    </div>
  );
};
export default UserSection;
