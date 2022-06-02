import { firebaseApp } from "../../server.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export function signUp(req, res) {
  const auth = getAuth(firebaseApp);
  const displayName = req.body.displayName;
  const email = req.body.email;
  const password = req.body.password;
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
      res.json(userCredential.user);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
}

export function logIn(req, res) {
  const auth = getAuth(firebaseApp);
  const email = req.body.email;
  const password = req.body.password;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      res.json(userCredential.user);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
}

export function logOut(req, res) {
  const auth = getAuth(firebaseApp);
  signOut(auth)
    .then(() => {
      res.json({
        code: 200,
        message: "User signed out",
      });
    })
    .catch((error) => {
      res.statusCode(400).json(error);
    });
}
