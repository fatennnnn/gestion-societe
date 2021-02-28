const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = config.get("jwtSecret");

//@routget api users test with token if user exist
router.get(
  "/",
  isAuth,
  async (req, res) => {
    try {
      //req.user de celle de modele definit a la fin
      const user = await User.findById(req.user.id).select("-motdepasse");
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  // res.send("auth route")
);

//? -------------------------------------> Login with email & password :login with mail and password to have token  <---------------------------------------//

//-@access     Public
//@route      Post api/auth;
//@desc       Authenticate user & get token

router.post(
  "/connection",
  [
    check("email", "slvp entrer un email valide ").isEmail(),
    check("motdepasse", "mot de passe est requi").isLength({ min: 3 }),
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
      const { email, motdepasse } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        const error = Error("user not found");
        (error.statusCode = 401),
          (error.data = [{ param: "email", msg: "wrong email" }]);
        throw error;
      }
      const isEqual = await bcrypt.compare(motdepasse, user.motdepasse);
      if (!isEqual) {
        const error = new Error("Wrong password");
        error.statusCode = 401;
        error.data = [{ param: "password", msg: "wrong password" }];
        throw error;
      }
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id.toString(),
          role: user.role,
        },
        jwtSecret,
        { expiresIn: "24h" }
      );

      res.status(200).json({
        token,
        userId: user._id.toString(),
        role: user.role,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
