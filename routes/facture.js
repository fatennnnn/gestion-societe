// test

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Facture = require("../models/Facture");
const isAuth = require("../middleware/is-auth");
const authRole = require("../utils/authRole");
const ROLE = require("../utils/roles");
const clearPdf = require("../utils/clearPdf");

// router.post("/facture", isAuth, async (req, res) => {
//   try {
//     const newFacture = new Facture({
//       user: req.user.id,
//       factures: [],
//     });
//     const facture = await newFacture.save();
//     res.json(facture);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

//. add new facture
router.post(
  "/create-facture",
  [
    isAuth,
    authRole(ROLE.ADMIN),
    [body("nomfacture").trim().isLength({ min: 4 })],
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      if (!req.file) {
        const error = new Error("No facture provided");
        error.statusCode = 422;
        error.data = [{ param: "file", msg: "No facture provided" }];
        throw error;
      }
      const factureUrl = req.file.path.replace("\\", "/");
      const { nomfacture, userId } = req.body;
      console.log("nomfacture", nomfacture);
      console.log("userId", userId);
      const newFacture = {
        nomfacture,
        factureUrl,
      };

      const facture = await Facture.findOne({ user: userId });

      facture.factures.unshift(newFacture);
      await facture.save();
      res.json(facture.factures);
    } catch (err) {
      next(err);
    }
  }
);

//delete facture
router.put(
  "/delete-facture",
  isAuth,
  authRole(ROLE.ADMIN),
  async (req, res, next) => {
    try {
      const { idFact, id } = req.body;
      const foundFact = await Facture.findOne({ user: idFact });

      const pdfPath = foundFact.factures.filter(
        (fact) => fact._id.toString() === id.toString()
      )[0].factureUrl;
      console.log("path", pdfPath);
      foundFact.factures = foundFact.factures.filter(
        (fact) => fact._id.toString() !== id.toString()
      );

      foundFact.save();
      if (!foundFact) {
        const error = new Error("No facture");
        error.statusCode = 404;
        throw error;
      }
      clearPdf(pdfPath, "..");

      res.status(200).json(foundFact.factures);
    } catch (error) {
      next(error);
    }
  }
);

//get facture by id of user

router.get("/allFactUser/:idUser", isAuth, async (req, res, next) => {
  try {
    const { idUser } = req.params;

    const allFactIdUser = await Facture.findOne({ user: idUser });
    if (!allFactIdUser.factures) {
      const error = new Error("No allFactUser");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(allFactIdUser.factures);
  } catch (err) {
    next(err);
  }
});

//get all bon de commande

router.get(
  "/allFacture",
  isAuth,
  authRole(ROLE.ADMIN),
  async (req, res, next) => {
    try {
      const allFact = await Facture.find();

      const allFacture = allFact.map((fact) => {
        return {
          user: fact.user,
          factures: fact.factures,
        };
      });
      console.log("allFacture", allFacture);
      res.status(200).json(allFacture);
    } catch (err) {
      next(err);
    }
  }
);

//add bon de commande

router.post(
  "/create-boncommande",
  [
    isAuth,
    authRole(ROLE.USER),
    [body("nombonCommande").trim().isLength({ min: 4 })],
  ],
  async (req, res, next) => {
    console.log("request body", req.body);
    try {
      const errors = validationResult(req);
      //   if (!errors.isEmpty()) {
      //     return res.status(400).json({ errors: errors.array() });
      //   }
      if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      if (!req.file) {
        const error = new Error("No bon de commande  provided");
        error.statusCode = 422;
        error.data = [{ param: "file", msg: "No bon de commande   provided" }];
        throw error;
      }
      const bonCommandeUrl = req.file.path.replace("\\", "/");
      const { nombonCommande, userId } = req.body;
      const newbonCommande = {
        nombonCommande,
        bonCommandeUrl,
      };

      const commande = await Facture.findOne({ user: userId });
      console.log("commande", commande);
      console.log("user id", userId);
      commande.bonCommandes.unshift(newbonCommande);
      await commande.save();
      res.json(commande.bonCommandes);
      console.log("commande", commande);
    } catch (err) {
      next(err);
    }
  }
);

//delete bon de commande by admin
router.put(
  "/delete-bonCommande",
  isAuth,
  authRole(ROLE.ADMIN),
  async (req, res, next) => {
    try {
      const { idComm, id } = req.body;
      const foundComm = await Facture.findOne({ user: idComm });

      const pdfPath = foundComm.bonCommandes.filter(
        (fact) => fact._id.toString() === id.toString()
      )[0].bonCommandeUrl;
      console.log("path", pdfPath);
      foundComm.bonCommandes = foundComm.bonCommandes.filter(
        (fact) => fact._id.toString() !== id.toString()
      );

      foundComm.save();
      if (!foundComm) {
        const error = new Error("No Commande");
        error.statusCode = 404;
        throw error;
      }
      clearPdf(pdfPath, "..");

      res.status(200).json(foundComm.bonCommandes);
    } catch (error) {
      next(error);
    }
  }
);

//get all bon de commande

router.get(
  "/allcommande",
  isAuth,
  authRole(ROLE.ADMIN),
  async (req, res, next) => {
    try {
      const allFact = await Facture.find();

      const allCommande = allFact.map((fact) => {
        return {
          user: fact.user,
          bonCommandes: fact.bonCommandes,
        };
      });
      console.log("allCommande", allCommande);
      res.status(200).json(allCommande);
    } catch (err) {
      next(err);
    }
  }
);
// //add contrat auto for all user how is enregistrer

// router.put(
//   "/contrat",
//   // isAuth,
//   // authRole(ROLE.ADMIN),
//   [body("name").trim().isLength({ min: 4 })],
//   async (req, res, next) => {
//     try {
//       const errors = validationResult(req);

//       if (!errors.isEmpty()) {
//         const error = new Error("Validation failed");
//         error.statusCode = 422;
//         error.data = errors.array();
//         throw error;
//       }

//       if (!req.file) {
//         const error = new Error("No facture provided");
//         error.statusCode = 422;
//         error.data = [{ param: "file", msg: "No facture provided" }];
//         throw error;
//       }
//       const contratUrl = req.file.path.replace("\\", "/");
//       const newContrat = {
//         nomcontrat: req.body.name,
//         contratUrl,
//       };

//       const allFactContrat = await Facture.find();
//       console.log(allFactContrat);
//       let allContrat = allFactContrat.map(async (fact) => {
//         let facture = await Facture.findById(fact._id);
//         facture.contrats.unshift(newContrat);
//         await facture.save();
//         return facture;
//       });
//       res.status(200).json(allFactContrat);
//     } catch (err) {
//       next(err);
//     }
//   }
// );//end of add for all

///get  bon commande of user by id
router.get("/allCommandeUser/:idUser", isAuth, async (req, res, next) => {
  try {
    const { idUser } = req.params;

    const allComandeIdUser = await Facture.findOne({ user: idUser });
    if (!allComandeIdUser.bonCommandes) {
      const error = new Error("Nobon  commande user");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(allComandeIdUser.bonCommandes);
  } catch (err) {
    next(err);
  }
});

//add contrat for each user by admin

router.post(
  "/create-contrat",
  [
    // isAuth,
    // authRole(ROLE.ADMIN),
    [body("nomcontrat").trim().isLength({ min: 4 })],
  ],
  async (req, res, next) => {
    // console.log("request body", req.body);
    try {
      const errors = validationResult(req);
      //   if (!errors.isEmpty()) {
      //     return res.status(400).json({ errors: errors.array() });
      //   }
      if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      if (!req.file) {
        const error = new Error("No contrat provided");
        error.statusCode = 422;
        error.data = [{ param: "file", msg: "No contrat provided" }];
        throw error;
      }
      const contratUrl = req.file.path.replace("\\", "/");
      const { nomcontrat, userId } = req.body;
      const newContrat = {
        nomcontrat,
        contratUrl,
      };

      const contrat = await Facture.findOne({ user: userId });

      contrat.contrats.unshift(newContrat);
      await contrat.save();
      res.json(contrat.contrats);
      console.log("contrat", contrat);
    } catch (err) {
      next(err);
    }
  }
);

//delete contrat for  user by admin
router.put(
  "/delete-Contrat",
  isAuth,
  authRole(ROLE.ADMIN),
  async (req, res, next) => {
    try {
      const { idCont, id } = req.body;
      const foundContrat = await Facture.findOne({ user: idCont });

      const pdfPath = foundContrat.contrats.filter(
        (fact) => fact._id.toString() === id.toString()
      )[0].contratUrl;
      console.log("path", pdfPath);
      foundContrat.contrats = foundContrat.contrats.filter(
        (fact) => fact._id.toString() !== id.toString()
      );

      foundContrat.save();
      if (!foundContrat) {
        const error = new Error("No contrat");
        error.statusCode = 404;
        throw error;
      }
      clearPdf(pdfPath, "..");

      res.status(200).json(foundContrat.contrats);
    } catch (error) {
      next(error);
    }
  }
);

//get contrat by id of user

router.get(
  "/contrat/:idUser",
  isAuth,
  // authRole(ROLE.USER),
  async (req, res, next) => {
    try {
      const { idUser } = req.params;

      const allConnIdUser = await Facture.findOne({ user: idUser });

      console.log("user id", idUser);
      // const allConnUser = allConnId.contrats.map((fact) => {
      //   return {
      //     contrats: fact,
      //   };
      // });

      if (!allConnIdUser.contrats) {
        const error = new Error("No contrat");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json(allConnIdUser.contrats);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
