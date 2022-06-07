const app = require("express");
const router = app.Router();
const Middleware = require("../middleware/middleware");
const { AddRecommender, GetRecommender } = require("../controller/recommender-controller");


router.post("/", Middleware, AddRecommender);
router.get("/:uid", Middleware, GetRecommender);

module.exports = router;