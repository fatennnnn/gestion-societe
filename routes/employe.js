const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Employe = require("../models/Employe");
const isAuth = require("../middleware/is-auth");
const authRole = require("../utils/authRole");
const ROLE = require("../utils/roles");

//edit employé

router.post(
  "/information-employe",
  //   [isAuth, authRole(ROLE.ADMIN)],
  async (req, res, next) => {
    const {
      user,
      nom,
      prenom,
      dateembauche,
      datedenaissance,
      posteoccupe,
      telephone,
    } = req.body;
    try {
      const foundemploye = await Employe.findOne({ user });
      if (foundemploye) {
        const error = new Error("employe exist");
        error.statusCode = 404;
        throw error;
      }
      let newemploye = new Employe({
        user,
        nom,
        prenom,
        dateembauche,
        datedenaissance,
        posteoccupe,
        telephone,
      });
      await newemploye.save();
      res.status(200).json(newemploye);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
