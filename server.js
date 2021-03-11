const express = require("express");
const connectDB = require("./config/db");
var fs = require("fs");
//role admin
const createAdmin = require("./utils/createadmin");
const authRoutes = require("./routes/auth");
const utilisateur = require("./routes/user");
const facture = require("./routes/facture");
const workerRoutes = require("./routes/worker");
const ficheDePaie = require("./routes/ficheDePaie");
const employe = require("./routes/employe");
const multer = require("multer");
const app = express();
const path = require("path");

//upload pdf
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "factures");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//// init middleware this allows us to get the data in req.body
app.use(express.json({ extended: false }));
// Connect DATABASE
connectDB();
//insert adminto database
createAdmin();
app.get("/", (req, res) => res.send("api runing"));
//define routes
//nom du input file for facture and contrat of client
app.use(multer({ storage: fileStorage, fileFilter }).single("facture"));
app.use("/factures", express.static(path.join(__dirname, "factures")));

app.get("/download-file/:fileUrl", async (req, res, next) => {
  try {
    const { fileUrl } = req.params;
    res.set({
      "Content-Type": "application/pdf",
    });
    res.sendFile(path.join(__dirname, `factures/${fileUrl}`));
  } catch (error) {
    next(error);
  }
});

//nom du input file for fichede paie of worker
// app.use(multer({ storage: fileStoragee, fileFilter }).single("ficheDePaie"));
// app.use("/ficheDePaies", express.static(path.join(__dirname, "ficheDePaies")));

app.use("/user", utilisateur);
app.use("/auth", authRoutes);
app.use("/facture", facture);
app.use("/worker", workerRoutes);
app.use("/ficheDePaie", ficheDePaie);
app.use("/employe", employe);
// custom error handler
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  return res.status(statusCode).json({ message, data });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
