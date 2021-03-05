import React from "react";
import { useDispatch } from "react-redux";

import { deleteWorker } from "../../features/adminWorker";
import "./DeleteWorker.css";

const DeleteWorker = ({ workers }) => {
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(deleteWorker({ id }));
  };
  return (
    <div className="workerlist">
      <h3>Listes des employés </h3>
      {workers && workers.length > 0 ? (
        workers.map((worker) => (
          <div className="worker__item" key={worker._id}>
            {/* console.log("id",{worker._id}) */}
            <h5>l' employé</h5>
            <span>{worker.email}</span>
            <button
              onClick={() => handleClick(worker._id)}
              className="deleteworker"
            >
              supprimer
            </button>
          </div>
        ))
      ) : (
        <h5>il n'y a pas employés </h5>
      )}
    </div>
  );
};
export default DeleteWorker;
