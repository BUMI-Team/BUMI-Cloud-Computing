import express from "express";
import { signUp, logIn, logOut } from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", logIn);
router.get("/signout", logOut);

export { router as authRoutes };
