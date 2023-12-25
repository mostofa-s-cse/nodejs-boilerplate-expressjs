// const { createResponse } = require("../../utils/responseGenerator");
const db = require("../../models");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/jwt_token");
const { ErrorLogger, customerLogger } = require("../../utils/logger");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = db.user;

// User signup .............................................
module.exports.signup = async (req, res) => {
  try {
    const {
      first_name, 
      email, 
      password
    } = req.body;


    if (!first_name) {
      return res.status(400).json({
        status: "fail",
        message: "User Name is a required field",
      });
    }
  
    if (!email) {
      return res.status(400).json({
        status: "fail",
        message: "User Email is a required field",
      });
    }
  
    if (!password) {
      return res.status(400).json({
        status: "fail",
        message: "Password is a required field",
      });
    }


    const userCheck = await User.findOne({
      where: {
        email: email
      }
    })


    if (userCheck) {
      return res.status(403).send({
        status: "fail",
        message: "User already exist",
      })
    } else {
      // Insert User in Users table
      const newuser = await User.create({
        first_name, 
        email, 
        password,
        role: "user",
      });
      res.status(200).send({
        status: "success",
        message: "Acoount create successfully",
        data: {
          first_name: newuser.first_name,
          email: newuser.email,
          role: newuser.role,
        },
      });
    }

  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "Acoount create fail",
      error: error.message,
    });
    ErrorLogger.error("user create" + " " + error.message);
  }
};



// Get ALl User ...........................................
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    
    if (!users || users.length === 0) {
      return res.status(404).send({
        status: "fail",
        message: "User not found"
      });
    }

    const userData = users.map(user => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    }));

    res.status(200).send({
      status: "success",
      message: "This is your all data",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error fetching data",
      error: error.message,
    });
  }
};

// Get Single User ...................................
module.exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id: id },
    });

    if (!user) {
      return res.status(400).send({
        status: "fail",
        message: "User not found"
      });
    }
    res.status(200).send({
      status: "success",
      message: "This is your information",
      data: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name, 
          email: user.email,
          role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "User not found",
      error: error.message,
    });
  }
};

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

// User login .............................................
module.exports.login = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    // console.log(User_Email, pass_word);

    if (!email || !password) {
      return res.status(400).send({
        status: "fail",
        message: "Please provide your credentials"
      });
    }

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res
        .status(400)
        .send({
          status: "fail",
          message: "No user found.Please create an account first"
        });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    // const isPasswordValid = user.compareSync(pass_word, user.pass_word);
    // console.log(user.pass_word, pass_word)
    // console.log("isPasswordValid", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).send({
        status: "fail",
        message: "Your password is not correct"
      });
    }

    // if (user.status != "active") {
    //   return res.status(401).json({
    //     status: "fail",
    //     error: "Your account is not active yet",
    //   });
    // }

    const token = generateToken(user);


    res.cookie('token', token, { maxAge: 28800000, secure: true }).status(200).send({
      status: "success",
      message: "Logged in successfully",
      data: {
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name, 
          email: user.email,
          role: user.role,
        },
        token, 
      },
    });

    // console.log(`this is the cookies awesome ${req.cookies.jwt}`);
  } catch (error) {
    ErrorLogger.error(error.message);
    next(error.message);
  }
};



// User information update ....................................
module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, password, role } = req.body;

    // Validate required fields
    if (!first_name || !email) {
      return res.status(400).json({
        status: "fail",
        message: "First Name and Email are required fields",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user with hashed password
    const result = await User.update(
      {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        role,
      },
      {
        where: { id: id },
      }
    );

    res.status(200).json({
      status: "success",
      message: "User information successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed to update user information",
      error: error.message,
    });
    ErrorLogger.error("updateUserInformation" + " " + error.message);
  }
};

// User delete ....................................
module.exports.deleteUser = async (req, res) => {
  try {
      const { id } = req.params;
      if (!id) {
          return res.send({
            status: "fail",
            message: "Id not found",
          })

      }
      const result = await User.destroy({ where: { id: id } })

      if (!result) {
          return res.send({
            status: "fail",
            message: "Result not found",
          })

      }

      res.status(200).send({
          status: "success",
          message: "Successfully User information delete",
          // data: result
      })
  } catch (error) {

      res.status(400).send({
          status: "fail",
          message: "No User found",
          error: error.message
      })
  }
}



