import app from "express";
import Middleware from "../middleware/middleware.js";
import {
  AddRecommender,
  GetRecommender,
} from "../controllers/recommender-controller.js";

const router = app.Router();

router.post("/", Middleware, AddRecommender);
router.get("/", Middleware, GetRecommender);

export { router as RecommenderRoutes };
