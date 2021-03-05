import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";

import { getFicheDePaie, downloadFile } from "../../features/fichedePaies";
import "./GetFichedePaieUser.css";
const GetFichedePaieUser = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [values, setValues] = useState({
    numPages: null,
    pageNumber: 1,
  });
  const { numPages, pageNumber } = values;
  const dispatch = useDispatch();
  //   const location = useLocation();
  //   const { worker } = location.state;
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getFicheDePaie(user.userId));
    }
  }, [isAuthenticated]);

  const { fichedePaie, fichedePaieErrors, fichedePaieStatus } = useSelector(
    (state) => state.fichedePaies
  );
  const onDocumentLoadSuccess = ({ numPages }) => {
    setValues({ ...values, numPages });
  };
  const handleDownload = (path) => {
    dispatch(downloadFile({ path, mimetype: "application/pdf" }));
  };
  return (
    <div className="user__facture">
      <h2>liste FICHE DE PAIE </h2>
      {fichedePaieStatus.getAll === "loading" ? (
        <span>loading</span>
      ) : fichedePaieStatus.getAll == "succeded" ? (
        fichedePaie.map((item) => (
          <div className="user__facture__list" key={item._id}>
            <h4>{item.nomFichedePaie}</h4>
            <div className="user__facture__list__pdf">
              <Document
                // style={{ width: 600 }}
                file={`../${item.fichedePaieUrl}`}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} width={200} height={200} />
              </Document>
            </div>
            <button
              className="user__facture__download"
              onClick={() => handleDownload(item.fichedePaieUrl)}
            >
              telecharger
            </button>
          </div>
        ))
      ) : (
        <h4>error</h4>
      )}
    </div>
  );
};

export default GetFichedePaieUser;
