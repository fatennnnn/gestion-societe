import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";

import { getContratUserId, deleteContrat } from "../../features/contrats";
import AddContrat from "../../component/AddContrat/AddContrat";
const UserContratList = () => {
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
    dispatch(getContratUserId(user._id));
  }, []);
  const handleClick = (id) => {
    dispatch(deleteContrat({ idCont: user._id, id }));
  };
  const { contrat, contratErrors, contratStatus } = useSelector(
    (state) => state.contrats
  );
  const onDocumentLoadSuccess = ({ numPages }) => {
    setValues({ ...values, numPages });
  };
  return (
    <div>
      <h2>liste contrat :{user.nom} </h2>
      <AddContrat userId={user._id} />
      {contratStatus.getAll === "loading" ? (
        <span>loading</span>
      ) : contratStatus.getAll == "succeded" ? (
        contrat.map((item) => (
          <div key={item._id}>
            <span>{item.nomcontrat}</span>
            {/* <span>{item.contratUrl}</span> */}
            <div style={{ width: 600 }}>
              <Document
                // style={{ width: 600 }}
                file={`../${item.contratUrl}`}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} width={300} height={200} />
              </Document>
            </div>

            {/* console.log("id",{item._id}) */}
            <button onClick={() => handleClick(item._id)}>supprimer</button>
          </div>
        ))
      ) : (
        <span>error</span>
      )}
    </div>
  );
};

export default UserContratList;
