import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllWorkers } from "../../features/adminWorker";
import AddWorker from "../AddWorker/AddWorker";
import DeleteWorker from "../DeleteWorker/DeleteWorker";
const WorkerList = () => {
  const dispatch = useDispatch();

  // let isAuth = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    // if (isAuth) {
    dispatch(getAllWorkers());
    // }
  }, []);
  const { workers, workerErrors, workerStatut } = useSelector(
    (state) => state.adminWorker
  );

  return (
    <div>
      <AddWorker />
      {/* <h2>Listes des employés </h2> */}

      {workerStatut.getAll === "loading" ? (
        <span>loading</span>
      ) : workerStatut.getAll === "failed" ? (
        <h3>quelque chose s'est mal passe</h3>
      ) : workerStatut.getAll === "succeded" && workers.length > 0 ? (
        <DeleteWorker workers={workers} />
      ) : (
        <h3>pas d'employés</h3>
      )}
    </div>
  );
};
export default WorkerList;
