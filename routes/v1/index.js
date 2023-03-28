const router = require("express").Router();
const user = require("./users");
const { roundToNearestMinutesWithOptions } = require("date-fns/fp");
const { route } = require("./users");

router.use("/user", user);
module.exports = router;
