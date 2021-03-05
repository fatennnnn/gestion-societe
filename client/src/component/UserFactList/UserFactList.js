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
    <div className="user__facture">
      <h2>liste facture :{user.nom} </h2>
      <AddFacture userId={user._id} />
      {factureStatus.getFactId === "loading" ? (
        <span>loading</span>
      ) : factureStatus.getFactId == "succeded" ? (
        facture.map((item) => (
          <div className="user__facture__list" key={item._id}>
            <h4>{item.nomfacture}</h4>
            <div className="user__facture__list__pdf">
              <Document
                // style={{ width: 600 }}
                file={`../${item.factureUrl}`}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  className="user__facture__list__pdf--color"
                  pageNumber={pageNumber}
                  width={200}
                  height={200}
                />
              </Document>
            </div>
            {/* console.log("id",{item._id}) */}
            <button
              className="user__facture__delete"
              onClick={() => handleClick(item._id)}
            >
              supprimer
            </button>
          </div>
        ))
      ) : (
        <h4>error</h4>
      )}
    </div>
  );
};

export default UserFactList;
