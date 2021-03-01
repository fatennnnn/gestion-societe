import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
// import {
//   PDFDownloadLink,
//   pdf,
//   Document,
//   Page,
//   Text,
// } from "@react-pdf/renderer;
import FileSaver from "file-saver";
import { download } from "downloadjs";
// import useFileDownloader from "hooks/useFileDownloader";

import {
  getBonCommandeUserId,
  deleteBonCommande,
  downloadFile,
} from "../../features/bonCommandes";

// var FileSaver = require("file-saver");

const UserBonCommandeList = () => {
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
    dispatch(getBonCommandeUserId(user._id));
  }, []);
  const handleClick = (id) => {
    dispatch(deleteBonCommande({ idComm: user._id, id }));
  };
  const { bonCommande, bonCommandeErrors, bonCommandeStatus } = useSelector(
    (state) => state.bonCommandes
  );
  const onDocumentLoadSuccess = ({ numPages }) => {
    setValues({ ...values, numPages });
  };
  const myDoc = (item) => (
    <Document
      // style={{ width: 600 }}
      file={`../${item.bonCommandeUrl}`}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      <Page pageNumber={pageNumber} width={300} height={200} />
    </Document>
  );
  // const FileDownloader = () => {
  //   const [downloadFile, downloaderComponentUI] = useFileDownloader();

  //   const download = (file) => downloadFile(file);
  const handleDownload = (path) => {
    dispatch(downloadFile({ path, mimetype: "application/pdf" }));
  };
  return (
    <div>
      <h2>liste Bon Commande :{user.nom} </h2>

      {bonCommandeStatus.getAll === "loading" ? (
        <span>loading</span>
      ) : bonCommandeStatus.getAll == "succeded" ? (
        bonCommande.map((item) => (
          <div key={item._id}>
            <span>{item.nombonCommande}</span>
            <div style={{ width: 600 }}>{myDoc(item)}</div>
            {/* 
            <button onClick={() => download(`../${item.contratUrl}`)}>
              telecharger
            </button>
            <a
              href={`../../${item.contratUrl}`}
              download="proposed_file_name.pdf"
            >
              Download
            </a> */}
            <button onClick={() => handleClick(item._id)}>supprimer</button>
            <button onClick={() => handleDownload(item.bonCommandeUrl)}>
              telecharger
            </button>
          </div>
        ))
      ) : (
        <span>error</span>
      )}
    </div>
  );
};
export default UserBonCommandeList;
