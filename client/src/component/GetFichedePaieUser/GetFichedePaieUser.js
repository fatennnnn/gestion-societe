import React, { useEffect, useState } from "react";
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
    <div className="user__fiche__user">
      <h2>Fiches de paies </h2>
      <div className="user__fiche__user__all">
        {fichedePaieStatus.getAll === "loading" ? (
          <h3>Chargement en cours</h3>
        ) : fichedePaieStatus.getAll == "succeded" ? (
          fichedePaie.map((item) => (
            <div className="user__fiche__list__user" key={item._id}>
              <h4>{item.nomFichedePaie}</h4>
              <div className="user__fiche__list__user__pdf">
                <Document
                  // style={{ width: 600 }}
                  file={`../${item.fichedePaieUrl}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} width={250} height={300} />
                </Document>
              </div>
              <button
                className="user__fiche__download__user"
                onClick={() => handleDownload(item.fichedePaieUrl)}
              >
                télécharger
              </button>
            </div>
          ))
        ) : (
          <h3>erreur</h3>
        )}
      </div>
    </div>
  );
};

export default GetFichedePaieUser;
