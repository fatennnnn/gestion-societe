import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";

import { getBonCommandeUserId } from "../../features/bonCommandes";
import AddBonCommandeClient from "../AddBonCommandeClient/AddBonCommandeClient";
import "./GetBonCommandeClient.css";
const GetBonCommandeClient = () => {
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
      dispatch(getBonCommandeUserId(user.userId));
    }
  }, [isAuthenticated]);

  const { bonCommande, bonCommandeErrors, bonCommandeStatus } = useSelector(
    (state) => state.bonCommandes
  );
  const onDocumentLoadSuccess = ({ numPages }) => {
    setValues({ ...values, numPages });
  };
  return (
    <div className="usercompte__boncommande">
      <h2>liste Bon Commande </h2>
      <AddBonCommandeClient userId={user.userId} />
      <div className="usercompte__boncommande__all">
        {bonCommandeStatus.getAll === "loading" ? (
          <h3> Chargement en cour </h3>
        ) : bonCommandeStatus.getAll == "succeded" ? (
          bonCommande.map((item) => (
            <div className="usercompte__boncommande__list" key={item._id}>
              <h4>{item.nombonCommande}</h4>
              <div
                className="usercompte__boncommande__list__pdf"
                // style={{ width: 600 }}
              >
                <Document
                  // style={{ width: 600 }}
                  file={`../${item.bonCommandeUrl}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} width={200} height={200} />
                </Document>
              </div>
            </div>
          ))
        ) : (
          <h3>erreur</h3>
        )}
      </div>
    </div>
  );
};
export default GetBonCommandeClient;
