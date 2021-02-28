const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const jwtSecret = config.get("jwtSecret");

const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const isAuth = require("../middleware/is-auth");
const ROLE = require("../utils/roles");
const authRole = require("../utils/authRole");
const FichedePaie = require("../models/FichedePaie");
// user must be authenticated and admin
router.post(
  "/create-worker",
  [
    body("email").trim().isLength({ min: 5 }),
    body("motdepasse").trim().isLength({ min: 3 }),
  ],
  // isAuth,
  // authRole(ROLE.ADMIN),
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
      const existedUser = await User.findOne({ email });
      if (existedUser) {
        const error = new Error("email already exists");
        error.statusCode = 409;
        throw error;
      }

      const hashedPassword = await bcrypt.hash(motdepasse, 10);
      const user = new User({
        email,
        motdepasse: hashedPassword,
        role: ROLE.WORKER,
      });
      const createdUser = await user.save();

      //add doc for fiche de paie

      const newFiche = new FichedePaie({
        user: user.id,
      });
      await newFiche.save();

      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id.toString(),
          role: user.role,
        },
        jwtSecret,
        { expiresIn: "24h" }
      );

      //socket
      //   req.io.of("/admin-space").emit("workers", {
      //     action: "create",
      //   });

      res
        .status(201)
        .json({ token, message: "User created", userId: createdUser._id });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/list-worker",
  isAuth,
  authRole(ROLE.ADMIN),
  async (req, res, next) => {
    try {
      const workers = await User.find({ role: "worker" });

      res.status(200).json(workers);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/del-worker",
  // isAuth,
  // authRole(ROLE.ADMIN),
  async (req, res, next) => {
    try {
      const { id } = req.body;

      const response = await User.findOneAndDelete({ _id: id });

      if (!response) {
        const error = new Error("No worker");
        error.statusCode = 404;
        throw error;
      }
      // req.io.of("/admin-space").emit("owners", { action: "delete" });
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
