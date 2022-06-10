import app from "express";
import Middleware from "../middleware/middleware.js";
import {
  AddRecommender,
  AddInputRecommender,
  GetRecommender,
  GetInputRecommender
} from "../controllers/recommender-controller.js";

const router = app.Router();

router.post("/", Middleware, AddRecommender);
router.post("/input", Middleware, AddInputRecommender);
router.get("/", Middleware, GetRecommender);
router.get("/input", Middleware, GetInputRecommender);

export { router as RecommenderRoutes };
