import React from "react";
import { useDispatch } from "react-redux";

import { deleteWorker } from "../../features/adminWorker";

const DeleteWorker = ({ workers }) => {
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(deleteWorker({ id }));
  };
  return (
    <div>
      <h2>Listes des employés </h2>
      {workers && workers.length > 0 ? (
        workers.map((worker) => (
          <div key={worker._id}>
            {/* console.log("id",{worker._id}) */}
            <h3>l' employé</h3>
            <h2>{worker.email}</h2>
            <button onClick={() => handleClick(worker._id)}>supprimer</button>
          </div>
        ))
      ) : (
        <h3>il n'y a pas employés </h3>
      )}
    </div>
  );
};
export default DeleteWorker;
