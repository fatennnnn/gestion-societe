import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";

import { getContratUserId, downloadFile } from "../../features/contrats";

const GetContratClient = () => {
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
      dispatch(getContratUserId(user.userId));
    }
  }, [isAuthenticated]);

  const { contrat, contratErrors, contratStatus } = useSelector(
    (state) => state.contrats
  );
  const onDocumentLoadSuccess = ({ numPages }) => {
    setValues({ ...values, numPages });
  };
  const handleDownload = (path) => {
    dispatch(downloadFile({ path, mimetype: "application/pdf" }));
  };
  return (
    <div>
      <h2>liste contrat </h2>
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
            <button onClick={() => handleDownload(item.contratUrl)}>
              telecharger
            </button>
            {/* console.log("id",{item._id}) */}
          </div>
        ))
      ) : (
        <span>error</span>
      )}
    </div>
  );
};

export default GetContratClient;
