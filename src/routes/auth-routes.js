import { firebaseApp } from "../../server.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import express from "express";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const auth = getAuth(firebaseApp);
  const displayName = req.body.displayName;
  const email = req.body.email;
  const password = req.body.password;
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      res.json(userCredential.user);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post("/signin", async (req, res) => {
  const auth = getAuth(firebaseApp);
  const email = req.body.email;
  const password = req.body.password;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      res.json(userCredential.user);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/signout", async (req, res) => {
  const auth = getAuth(firebaseApp);
  signOut(auth)
    .then(() => {
      res.json({
        code: 200,
        message: "User signed out",
      });
    })
    .catch((error) => {
      res.json(error);
    });
});

export { router as authRoutes };
