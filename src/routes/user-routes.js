const app = require("express");
const router = app.Router();
const Middleware = require("../middleware/middleware");
const { GetUser, UpdateUser } = require("../controller/user-controller");

router.get("/", Middleware, GetUser);
router.patch("/", Middleware, UpdateUser);

module.exports = router;
