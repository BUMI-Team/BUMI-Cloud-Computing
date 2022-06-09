import app from "express";
import Middleware from "../middleware/middleware.js";
import { GetUser, UpdateUser } from "../controllers/user-controller.js";

const router = app.Router();

router.get("/", Middleware, GetUser);
router.patch("/", Middleware, UpdateUser);

export { router as UserRoutes };
