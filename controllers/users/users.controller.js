// const { createResponse } = require("../../utils/responseGenerator");
const db = require("../../models");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/jwt_token");
const { ErrorLogger, customerLogger } = require("../../utils/logger");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = db.user;

// console.log(User)

exports.signup = async (req, res) => {
  try {
    const users = req.body;
    console.log(req.body);

    const userCheck = await User.findOne({
      where: {
        User_Email: req.body.User_Email,
      },
    });

    if (userCheck) {
      return res.status(403).send({
        status: "Fail",
        message: "User already exist",
      });
    } else {
      const user = await User.create(req.body);
      // console.log('data save on database', user)
      customerLogger.info(req.originalUr);
      // responseLogger()
      res.status(200).send({
        status: "Success",
        message: "Successfully signed up",
        data: user,
      });

      // console.log('UserId', user.User_ID)
    }
  } catch (error) {
    ErrorLogger.error(req.originalUrl + " " + error.message);
    res.status(500).json({
      status: "fail",
      message: "Username or password is not curret",
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // const users = req.body;
    // console.log(req.body);
    const user = await User.findAll();
    // console.log('data save on database', user)
    if (!user) {
      return res.status(400).send("User not found");
    }
    res.status(200).send({
      status: "Success",
      message: "This is your all data",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "No data found",
      error: error.message,
    });
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const user = await User.findOne({
      where: { User_ID: id },
    });
    if (!user) {
      return res.status(500).send({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(200).send({
      status: "Success",
      message: "This is your information",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "User not found",
      error: error.message,
    });
  }
};

// exports.getSingleUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     // const users = req.body;
//     // console.log(req.body);
//     const user = await User.findOne({
//       where: { User_ID: id },
//     });

//     if (!user) {
//       return res.status(400).send("User not found");
//     }
//     res.status(200).send({
//       status: "Success",
//       message: "This is your information",
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: "User not found",
//       error: error.message,
//     });
//   }
// };

/**
 * 1. Check if Email and password are given
 * 2. Load user with email
 * 3. if not user send res
 * 4. compare password
 * 5. if password not correct send res
 * 6. check if user is active
 * 7. if not active send res
 * 8. generate token
 * 9. send user and token
 */
exports.login = async (req, res, next) => {
  try {
    const { User_Email, pass_word } = req.body;
    // console.log(User_Email, pass_word);

    if (!User_Email || !pass_word) {
      return res
        .status(400)
        .send({ status: "Fail", message: "Please provide your credentials" });
    }

    const user = await User.findOne({ where: { User_Email: User_Email } });
    if (!user) {
      return res.status(400).send({
        status: "Fail",
        message: "No user found. Please create an account first",
      });
    }

    const isPasswordValid = bcrypt.compareSync(pass_word, user.pass_word);
    // const isPasswordValid = user.compareSync(pass_word, user.pass_word);
    // console.log(user.pass_word, pass_word)
    // console.log("isPasswordValid", isPasswordValid);

    if (!isPasswordValid) {
      return res
        .status(400)
        .send({ status: "Fail", message: "Password or email is not correct" });
    }

    // if (user.status != "active") {
    //   return res.status(401).json({
    //     status: "fail",
    //     error: "Your account is not active yet",
    //   });
    // }

    const token = generateToken(user);

    res
      .cookie("token", token, { maxAge: 28800000, secure: true })
      .status(200)
      .send({
        status: "Success",
        message: "Logged in successfully",
        data: {
          user,
          token,
        },
      });

    // console.log(`this is the cookies awesome ${req.cookies.jwt}`);
  } catch (error) {
    ErrorLogger.error(error.message);
    next(error.message);

    // res.status(500).json({
    //   status: "fail",
    //   message: "Username or password is not curret",
    //   error: error.message,
    // });
  }
};

// User role information update
// module.exports.update_user = async (req, res) => {
//   // console.log('update_user', req.body);
//   try {
//     const { id } = req.params;
//     if (!id) {
//       return res.send("Id not found");
//     }
//     const result = await User.update(req.body, { where: { User_Id: id } });
//     if (!result) {
//       return res.send("Result not found");
//     }
//     res.status(200).send({
//       status: "Success",
//       message: "Successfully role update",
//       data: result,
//     });
//   } catch (error) {
//     res.status(400).send({
//       status: "fail",
//       message: "Not update role",
//       error: error.message,
//     });
//   }
// };
