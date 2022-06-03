import { firebaseApp } from "../../server.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
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

export function signUpGoogle(req, res) {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(firebaseApp);
  getRedirectResult(auth)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      res.status(200).json(credential);
    })
    .catch((error) => {
      res.status(error.code).json(error);
    });
}

export function logIn(req, res) {
  const auth = getAuth(firebaseApp);
  const email = req.body.email;
  const password = req.body.password;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      res.status(200).json(userCredential.user);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
}

export function logOut(req, res) {
  const auth = getAuth(firebaseApp);
  signOut(auth)
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "User signed out",
      });
    })
    .catch((error) => {
      res.status(400).json(error);
    });
}
