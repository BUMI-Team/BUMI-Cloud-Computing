const app = require("express");
const router = app.Router();
const Middleware = require("../middleware/middleware");
const { GetUser, UpdateUser } = require("../controller/user-controller");

router.get("/:uid", Middleware, GetUser);
router.patch("/:uid", Middleware, UpdateUser);

module.exports = router;
