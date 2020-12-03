const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/auth");

//Validator binding

const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");
const { Router } = require("express");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/signin", userSigninValidator, runValidation, signin);

router.get("/signout", signout);

//TESTING

router.get("/secret", requireSignin, (req, res) => {
  res.json({
    message: "Access Granted!",
  });
});
module.exports = router;
