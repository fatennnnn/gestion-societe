export const generateBase64FromPdf = (pdfFile) => {
  const reader = new FileReader();
  const promise = new Promise((resolve, reject) => {
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (err) => reject(err);
  });

  reader.readAsDataURL(pdfFile);
  return promise;
};
