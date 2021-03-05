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
  // const mois = (da) => {
  //   let a = String(da);
  //   // let str1=a[0]+a[1]
  //   if (a.slice(0, 1) > 1 || a.slice(0, 2) > 12) {
  //     return "";
  //   }
  //   // else if(str1<10)
  //   // {str1.padStart(2,"0")}
  //   // let str2=a[2]+a[3]
  //   // if(num.length==4){return n}
  //   return da.slice(0, 2) + "/" + da.slice(2);
  // };
  return (
    <div className="worker__fiche__admin">
      <h2>Fiche de paie :{worker.email} </h2>
      <AddFicheDePaie userId={worker._id} />
      {fichedePaieStatus.getAll === "loading" ? (
        <span>loading</span>
      ) : fichedePaieStatus.getAll == "succeded" ? (
        fichedePaie.map((item) => (
          <div className="worker_list_fiche" key={item._id}>
            <h4>{item.nomFichedePaie}</h4>
            <div className="affiche_fiche" style={{ width: 300 }}>
              <Document
                // style={{ width: 600 }}
                file={`../${item.fichedePaieUrl}`}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} width={300} height={200} />
              </Document>
            </div>
            {/* console.log("id",{item._id}) */}
            <button
              className="delete_fiche"
              onClick={() => handleClick(item._id)}
            >
              Supprimer
            </button>
          </div>
        ))
      ) : (
        <h4>error</h4>
      )}
    </div>
  );
};

export default WorkerFicheDePaie;
