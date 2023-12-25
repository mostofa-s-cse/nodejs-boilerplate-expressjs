const router = require("express").Router();
const user = require("../../controllers/users/users.controller");
const authorization = require("../../utils/authorization");
const { verifyToken } = require("../../utils/verifyToken");
// const recharge = require('../../models/recharge/recharge');

// router.post('/', user.userInsert);
// router.get('/cards/id', User.getCardByUserId);
// router.post('/', user.create);
// router.get('/', user.findAll);


//http://localhost:5000/api/v1/user/signup
router.post("/signup", user.signup);

//http://localhost:5000/api/v1/user/login
router.post("/login", user.login);


//http://localhost:5000/api/v1/user/
router.get("/", verifyToken, authorization("super_admin", "admin"), user.getAllUsers);

//http://localhost:5000/api/v1/user/1
router.get("/:id", user.getSingleUser);

http://localhost:5000/api/v1/user/login
router.put("/:id", verifyToken, authorization("super_admin", "admin"), user.update_user);

module.exports = router;
