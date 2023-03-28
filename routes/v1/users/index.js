const router = require("express").Router();
const user = require("../../../controllers/users/users.controller");
const authorization = require("../../../utils/authorization");
const { verifyToken } = require("../../../utils/verifyToken");
// const recharge = require('../../models/recharge/recharge');

// router.post('/', user.userInsert);
// router.get('/cards/id', User.getCardByUserId);
// router.post('/', user.create);
// router.get('/', user.findAll);

router.post("/signup", user.signup);
router.post("/login", user.login);
// router.get("/", verifyToken, authorization("super_admin", "admin"), user.getAllUsers);
router.get("/", user.getAllUsers);

router.get("/:id", user.getSingleUser);
// router.put("/:id", user.update_user);

module.exports = router;
