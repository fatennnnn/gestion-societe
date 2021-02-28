const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const isAuth = require("../middleware/is-auth");
const authRole = require("../utils/authRole");
const ROLE = require("../utils/roles");

const config = require("config");
const Facture = require("../models/Facture");
//@rout POST api users:enregistrer
router.post(
  "/sign-up",

  [
    check("nom", "nom est requis").isLength({ min: 4 }),
    check("prenom", "prenom est requis").isLength({ min: 4 }),
    check("numerosiret", "numero siret est requi").isLength({ min: 4 }),
    check("detail", " detail adresse est requi").isLength({ min: 4 }),
    check("region", "region est requi").isLength({ min: 4 }),
    check("email", "slvp ecrit email valide").isEmail(),
    check("tva", "tva required").isLength({ min: 4 }),
    check("telephone", "telephone est requi").isNumeric({ no_symbols: true }),
    check("gsm", "gsm est requi").isNumeric(),
    check("siteweb", "site web est requi ").isLength({
      min: 6,
    }),
    check("motdepasse", "mot de passe est requi").isLength({
      min: 2,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      nom,
      prenom,
      numerosiret,
      detail,
      region,

      email,
      tva,
      telephone,
      gsm,
      siteweb,
      motdepasse,
    } = req.body;
    // // console.log(req.body);
    try {
      //     //see if user exists
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "utulisateur existe " }] });
      }
      //encrypt mot de passe

      const adresse = { detail, region };
      user = new User({
        nom,
        prenom,
        numerosiret,
        adresse,
        email,

        tva,
        telephone,
        gsm,
        siteweb,
        motdepasse,
      });
      const salt = await bcrypt.genSalt(10);
      user.motdepasse = await bcrypt.hash(motdepasse, salt);
      await user.save();
      const newFacture = new Facture({
        user: user.id,
      });
      await newFacture.save();
      //decryptage ddu password dpour savoir connecter
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "24h" },

        (err, token) => {
          if (err) throw err;
          res.json({ token, role: user.role }); // here we return the token to the user
        }
      );
      // res.send("User enregistré");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
    // //
  }
);
//get all user

router.get(
  "/list-user",
  isAuth,
  authRole(ROLE.ADMIN),
  async (req, res, next) => {
    try {
      const users = await User.find({ role: "user" });

      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
