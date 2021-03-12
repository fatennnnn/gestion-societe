import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";

import {
  getFactureUserId,
  addFacture,
  deleteFacture,
} from "../../features/factures";
import AddFacture from "../../component/AddFacture/AddFacture";
import "./UserFactList.css";
const UserFactList = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [values, setValues] = useState({
    numPages: null,
    pageNumber: 1,
  });
  const { numPages, pageNumber } = values;
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = location.state;
  useEffect(() => {
    dispatch(getFactureUserId(user._id));
  }, []);
  const handleClick = (id) => {
    dispatch(deleteFacture({ idFact: user._id, id }));
  };
  const { facture, factureErrors, factureStatus } = useSelector(
    (state) => state.factures
  );
  const onDocumentLoadSuccess = ({ numPages }) => {
    setValues({ ...values, numPages });
  };
  return (
    <div className="userclient__fact">
      <h2>Factures :{user.nom} </h2>
      <AddFacture userId={user._id} />
      <div className="userclient__fact-all">
        {factureStatus.getFactId === "loading" ? (
          <h3>Chargement en cours</h3>
        ) : factureStatus.getFactId == "succeded" ? (
          facture.map((item) => (
            <div className="userclient__facture__list" key={item._id}>
              <h4>{item.nomfacture}</h4>
              <div className="userclient__facture__list__pdf">
                <Document
                  file={`../${item.factureUrl}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page
                    style={{
                      className: "userclient__facture__list__pdf--color",
                    }}
                    pageNumber={pageNumber}
                    width={250}
                    height={300}
                  />
                </Document>
              </div>
              {/* console.log("id",{item._id}) */}
              <button
                className="userclient__facture__delete"
                onClick={() => handleClick(item._id)}
              >
                supprimer
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

export default UserFactList;
