const User = require("../models/user");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email Id is already registered!",
      });
    }

    const { name, email, password } = req.body;
    let username = shortId.generate();

    let profile = `${CLIENT_URL}/profile/${username}`;
    let newUser = new User({ name, email, password, profile, username });
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      //   res.json({
      //     user: success,
      //   });
      res.json({
        message: "Signup Successfully! Please SignIn",
      });
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  //check user

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found ! Please signin.",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }

    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      expiresIn: "1d",
    });

    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout Successfully.",
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["SHA1"],
});
