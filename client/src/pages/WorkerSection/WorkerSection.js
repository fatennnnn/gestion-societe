import React, { useEffect } from "react";

import { Route, Switch } from "react-router-dom";
import GetFichedePaieUser from "../../component/GetFichedePaieUser/GetFichedePaieUser";

const WorkerSection = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/worker-section">
          worker section
        </Route>
        <Route exact path="/worker-section/ficheDePaie">
          <GetFichedePaieUser />
        </Route>
      </Switch>
    </div>
  );
};
export default WorkerSection;
