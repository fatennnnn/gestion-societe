const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const FichedePaie = require("../models/FichedePaie");
const isAuth = require("../middleware/is-auth");
const authRole = require("../utils/authRole");
const ROLE = require("../utils/roles");
const clearPdf = require("../utils/clearPdf");
//. add new fiche de paie
router.post(
  "/create-fichedepaie",
  [
    isAuth,
    authRole(ROLE.ADMIN),
    [body("nomFichedePaie").trim().isLength({ min: 4 })],
  ],
  async (req, res, next) => {
    console.log("request body", req.body);
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
        console.log("error", error);
      }
      if (!req.file) {
        const error = new Error("No fiche de paie provided");
        error.statusCode = 422;
        error.data = [{ param: "file", msg: "No fiche de paie provided" }];
        throw error;
      }
      const fichedePaieUrl = req.file.path.replace("\\", "/");
      const { nomFichedePaie, userId } = req.body;
      const newFiche = {
        nomFichedePaie,
        fichedePaieUrl,
      };

      const fiche = await FichedePaie.findOne({ user: userId });
      console.log("fiche", fiche);
      console.log("user id", userId);
      fiche.fichedePaies.unshift(newFiche);
      await fiche.save();
      res.json(fiche.fichedePaies);
    } catch (err) {
      next(err);
    }
  }
);

//delete facture
router.put(
  "/delete-fiche",
  isAuth,
  authRole(ROLE.ADMIN),
  async (req, res, next) => {
    try {
      const { idFiche, id } = req.body;
      const foundFiche = await FichedePaie.findOne({ user: idFiche });

      const pdfPath = foundFiche.fichedePaies.filter(
        (fact) => fact._id.toString() === id.toString()
      )[0].fichedePaieUrl;
      console.log("path", pdfPath);
      foundFiche.fichedePaies = foundFiche.fichedePaies.filter(
        (fact) => fact._id.toString() !== id.toString()
      );

      foundFiche.save();
      if (!foundFiche) {
        const error = new Error("No fiche");
        error.statusCode = 404;
        throw error;
      }
      clearPdf(pdfPath, "..");

      res.status(200).json(foundFiche.fichedePaies);
    } catch (error) {
      next(error);
    }
  }
);

//get fiche by id of user

router.get(
  "/allFichUser/:idUser",
  isAuth,
  // authRole(ROLE.USER),
  async (req, res, next) => {
    try {
      const { idUser } = req.params;

      const allFicheUserId = await FichedePaie.findOne({ user: idUser });
      // console.log("allFicheId", allFicheId);
      // console.log("user id", idUser);
      // const allFicheUser = allFicheId.fichedePaies.map((fact) => {
      //   return {
      //     fichedePaies: fact,
      //   };
      // });

      if (!allFicheUserId.fichedePaies) {
        const error = new Error("No fiche de paie");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json(allFicheUserId.fichedePaies);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
