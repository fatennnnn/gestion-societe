import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";

import { getFactureUserId, downloadFile } from "../../features/factures";
import "./GetFactureClient.css";
const GetFactureClient = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [values, setValues] = useState({
    numPages: null,
    pageNumber: 1,
  });
  const { numPages, pageNumber } = values;
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getFactureUserId(user.userId));
    }
  }, [isAuthenticated]);

  const { facture, factureErrors, factureStatus } = useSelector(
    (state) => state.factures
  );
  const onDocumentLoadSuccess = ({ numPages }) => {
    setValues({ ...values, numPages });
  };
  const handleDownload = (path) => {
    dispatch(downloadFile({ path, mimetype: "application/pdf" }));
  };
  return (
    <div className="factureclientuser">
      <h2>listes Factures </h2>
      <div className="factureclientuser__all">
        {factureStatus.getFactId === "loading" ? (
          <h3>Chargement en cours</h3>
        ) : factureStatus.getFactId == "succeded" ? (
          facture.map((item) => (
            <div className="factureclientuser__list" key={item._id}>
              <h4>{item.nomfacture}</h4>
              <div className="factureclientuser__list__pdf">
                <Document
                  file={`../${item.factureUrl}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page
                    // style={{
                    //   className: "userclient__facture__list__pdf--color",
                    // }}
                    pageNumber={pageNumber}
                    width={250}
                    height={300}
                  />
                </Document>
              </div>
              <button
                className="factureclientuser__download"
                onClick={() => handleDownload(item.factureUrl)}
              >
                telecharger
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

export default GetFactureClient;
