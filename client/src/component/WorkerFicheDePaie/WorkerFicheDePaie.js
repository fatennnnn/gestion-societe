import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";

import { getFicheDePaie, deleteFicheDePaie } from "../../features/fichedePaies";
import AddFicheDePaie from "../AddFicheDePaie/AddFicheDePaie";
import "./WorkerFicheDePaie.css";
const WorkerFicheDePaie = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [values, setValues] = useState({
    numPages: null,
    pageNumber: 1,
  });
  const { numPages, pageNumber } = values;
  const dispatch = useDispatch();
  const location = useLocation();
  const { worker } = location.state;

  useEffect(() => {
    dispatch(getFicheDePaie(worker._id));
  }, []);
  const handleClick = (id) => {
    dispatch(deleteFicheDePaie({ idFiche: worker._id, id }));
  };
  const { fichedePaie, fichedePaieErrors, fichedePaieStatus } = useSelector(
    (state) => state.fichedePaies
  );
  const onDocumentLoadSuccess = ({ numPages }) => {
    setValues({ ...values, numPages });
  };

  return (
    <div className="worker__fichedepaie__admin">
      <h2>Fiches de paies :{worker.email} </h2>
      <AddFicheDePaie userId={worker._id} />
      <div className="worker_list_fichedepaie__all">
        {fichedePaieStatus.getAll === "loading" ? (
          <h3>Chargement en cours</h3>
        ) : fichedePaieStatus.getAll == "succeded" ? (
          fichedePaie.map((item) => (
            <div className="worker_list_fichedepaie" key={item._id}>
              <h4>{item.nomFichedePaie}</h4>
              <div className="affiche_fichedepaie">
                <Document
                  // style={{ width: 600 }}
                  file={`../${item.fichedePaieUrl}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} width={250} height={300} />
                </Document>
              </div>
              {/* console.log("id",{item._id}) */}
              <button
                className="delete_fichedepaie"
                onClick={() => handleClick(item._id)}
              >
                Supprimer
              </button>
            </div>
          ))
        ) : (
          <h3>error</h3>
        )}
      </div>
    </div>
  );
};

export default WorkerFicheDePaie;
