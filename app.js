import express from "express";
import pkg from "firebase-admin";
import { initializeApp as initializeAdminApp } from "firebase-admin/app";
import { initializeApp as initializeClientApp } from "firebase/app";
import { getFirestore } from "firebase-admin/firestore";
import { adminSecrets, clientSecrets } from "./secrets.js";

import { AuthRoutes } from "./src/routes/auth-routes.js";
import { UserRoutes } from "./src/routes/user-routes.js";
import { RecommenderRoutes } from "./src/routes/recommender-routes.js";

const app = express();
const { credential } = pkg;
initializeAdminApp({
  credential: credential.cert(adminSecrets),
});

const db = getFirestore();
const firebaseClientApp = initializeClientApp(clientSecrets);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", AuthRoutes);
app.use("/api/recommender", RecommenderRoutes);
app.use("/api/user", UserRoutes);

export { app, db, firebaseClientApp };
