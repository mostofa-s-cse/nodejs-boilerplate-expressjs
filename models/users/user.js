const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes, Sequelize) => {
  const usertbls = sequelize.define(
    "usertbls",
    {
      User_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      User_Name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      User_Email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        // validate: [validator.isEmail, "Provide a valid Email"],
        unique: true,
        required: [true, "Email address is required"],
      },
      // PIN: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
      // IDcard: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
      // Passportno: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
      pass_word: {
        type: DataTypes.STRING,
        allowNull: false,
        required: [true, "Password is required"],
        // validate: {
        //   validator: (value) =>
        //     validator.isStrongPassword(value, {
        //       minLength: 6,
        //       minLowercase: 3,
        //       minNumbers: 1,
        //       minUppercase: 1,
        //       minnSymbols: 1,
        //     }),
        //   message: "Password {VALUE} is not strong enough",
        // },
      },
      // Mobile_No: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
      // agent: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
        enum: ["user", "admin", "super_admin"],
      },

      // status: {
      //   type: DataTypes.ENUM("pending", "active", "disabled"),
      //   defaultValue: "pending",
      // },
    },
    //   {
    //     hooks: {
    //       beforeCreate: async (user) => {
    //         if (user.password) {
    //           const salt = await bcrypt.genSaltSync(10, 'a');
    //           user.password = bcrypt.hashSync(user.password, salt);
    //         }
    //       },
    //     },
    //   },
    // );
    // usertbls.prototype.validPassword = async (password, hash) => {
    //   return await bcrypt.compareSync(password, hash);
    // };

    // usertbls.prototype.getHashPass = async (password) => {
    //   const salt = await bcrypt.genSaltSync(10, 'a');
    //   const hashed = bcrypt.hashSync(password, salt);
    //   return hashed;
    // };

    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.pass_word) {
            const salt = await bcrypt.genSaltSync(10);
            user.pass_word = bcrypt.hashSync(user.pass_word, salt);
          }
        },
      },
    }
  );
  usertbls.prototype.validPassword = async (pass_word, hash) => {
    return await bcrypt.compareSync(pass_word, hash);
  };
  usertbls.prototype.getHashPass = async (pass_word) => {
    const salt = await bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(pass_word, salt);
    return hashed;
  };
  return usertbls;
};
