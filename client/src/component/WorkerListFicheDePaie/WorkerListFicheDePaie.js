import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllWorkers } from "../../features/adminWorker";
import "./WorkerListFicheDePaie.css";
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
    <div className="worker__list__fiche">
      <h2>Gestion des employés </h2>

      {workerStatut.getAll === "loading" ? (
        <span className="error">loading</span>
      ) : workerStatut.getAll === "failed" ? (
        <span className="error">quelque chose s'est mal passé</span>
      ) : workerStatut.getAll === "succeded" && workers.length > 0 ? (
        workers && workers.length > 0 ? (
          workers.map((worker) => (
            <div className="workerlist__fiche" key={worker._id}>
              <h5>{worker.email}</h5>
              <Link
                className="link__fiche__admin"
                to={{
                  pathname: "/admin-section/employé-fiche",
                  state: { worker },
                }}
              >
                <h5>view fiche de paie </h5>
              </Link>
            </div>
          ))
        ) : (
          <h3>Il n'y a pas employés </h3>
        )
      ) : (
        <h3>Il n'y a pas employés</h3>
      )}
    </div>
  );
};
export default WorkerListFicheDePaie;
