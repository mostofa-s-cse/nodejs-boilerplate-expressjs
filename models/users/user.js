const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes, Sequelize) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },

      first_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        required: [true, "User Name is required"],
      },
      last_name: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      email: {
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
      password: {
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

    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
    }
  );
  users.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  };
  users.prototype.getHashPass = async (password) => {
    const salt = await bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    return hashed;
  };
  return users;
};
