import { firebaseClientApp } from "../../app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export function signUp(req, res) {
  const auth = getAuth(firebaseClientApp);
  const displayName = req.body.displayName;
  const email = req.body.email;
  const password = req.body.password;
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
      res.status(200).json({
        code: 200,
        userCredential: userCredential.user,
      });
    })
    .catch((error) => {
      res.status(400).json({
        code: 400,
        error: error,
      });
    });
}

export function logIn(req, res) {
  const auth = getAuth(firebaseClientApp);
  const email = req.body.email;
  const password = req.body.password;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      res.status(200).json({
        code: 200,
        userCredential: userCredential.user,
      });
    })
    .catch((error) => {
      res.status(400).json({
        code: 400,
        error: error,
      });
    });
}

export function logOut(req, res) {
  const auth = getAuth(firebaseClientApp);
  signOut(auth)
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "User signed out",
      });
    })
    .catch((error) => {
      res.status(400).json({
        code: 400,
        error: error,
      });
    });
}
