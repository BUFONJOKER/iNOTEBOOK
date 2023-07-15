const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const jwt_secret = "MANIISTHE@LEGEND.ORG";

//Route 1 create a new  user Post request localhost:5000/api/auth/createUser

router.post(
  "/createUser",

  // checking user entered data is correct
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name is required with minimum 3 letters"),
    body("email").isEmail().withMessage("Enter valid email address"),
    body("password").isLength({ min: 5 }).withMessage("Enter valid password"),
  ],
  async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ success,error: error.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ success,error: "Sorry user with this email exist" });
    }
    const salt = await bcrypt.genSalt(10);

    const securePassword = await bcrypt.hash(req.body.password, salt);
    // Create new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePassword,
    });

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, jwt_secret);
    success = true;
    res.json({ success,token });
 

    // res.json(user);
  }
);

//Route 2 login with a  user Post request localhost:5000/api/auth/login

router.post(
  "/login",
  // checking user entered data is correct
  [
    body("email").isEmail().withMessage("Enter valid email address"),
    body("password")
      .exists()
      .isLength({ min: 5 })
      .withMessage("Enter valid password"),
  ],
  async (req, res) => {
    let success=false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const email = req.body.email;
    const password = req.body.password;

    try {
      const user = await User.findOne({ email });

      //Check if the user is already exist

      if (!user) {
     
        return res
          .status(400)
          .json({ error: "Sorry, try with correct credentials" });
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        
        return res
          .status(400)
          .json({ success,error: "Sorry, try with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(data, jwt_secret);
      success = true;
      res.json({ success,token });
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

//Route 3 Get loggedin user details with a Post request localhost:5000/api/auth/getuser
//login required
router.post(
  "/getuser",
  fetchuser,
  async (req, res) => {
    try {
      const userid = req.user.id;
      const user = await User.findById(userid).select("-password");
      res.send(user);
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
