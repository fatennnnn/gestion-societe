import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getAllWorkers } from "../../features/adminWorker";

const WorkerListFicheDePaie = () => {
  const dispatch = useDispatch();

  let isAuth = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (isAuth) {
      dispatch(getAllWorkers());
    }
  }, [isAuth]);
  const { workers, workerErrors, workerStatut } = useSelector(
    (state) => state.adminWorker
  );
  return (
    <div>
      {/* <h2>Listes des employés </h2> */}

      {workerStatut.getAll === "loading" ? (
        <span>loading</span>
      ) : workerStatut.getAll === "failed" ? (
        <h3>quelque chose s'est mal passe</h3>
      ) : workerStatut.getAll === "succeded" && workers.length > 0 ? (
        workers && workers.length > 0 ? (
          workers.map((worker) => (
            <div key={worker._id}>
              <h3>l' employé</h3>
              <h2>{worker.email}</h2>
              <Link
                to={{
                  pathname: "/admin-section/employé-fiche",
                  state: { worker },
                }}
              >
                <span>view fiche de paie </span>
              </Link>
            </div>
          ))
        ) : (
          <h3>il n'y a pas employés </h3>
        )
      ) : (
        <h3>pas d'employés</h3>
      )}
    </div>
  );
};
export default WorkerListFicheDePaie;
