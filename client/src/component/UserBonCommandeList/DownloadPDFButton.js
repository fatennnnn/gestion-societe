import React, { useEffect, useState } from "react";
import { pdf, Document, Page, Text } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const DocumentPdf = ({}) => (
  <Document
    // style={{ width: 600 }}
    file={`../${item.bonCommandeUrl}`}
    onLoadSuccess={onDocumentLoadSuccess}
  >
    <Page pageNumber={pageNumber} width={300} height={200} />
  </Document>
);
const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

async function getProps() {
  await delay(1_000);
  return {
    someString: "You waited 1 second for this",
  };
}
export const LazyDownloadPDFButton = () => (
  <button
    onClick={async () => {
      const props = await getProps();
      const doc = <DocumentPdf {...props} />;
      const asPdf = pdf({}); // {} is important, throws without an argument
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();
      saveAs(blob, "document.pdf");
    }}
  >
    Download PDF
  </button>
);
