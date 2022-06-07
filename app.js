const express = require("express");
const app = express();

const { credential } = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./serviceAccountKey.json");

const UserRoutes = require("./src/routes/user-routes");
const RecommenderRoutes = require("./src/routes/recommender-routes");

initializeApp({
  credential: credential.cert(serviceAccount),
});

db = getFirestore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/recommender", RecommenderRoutes);
app.use("/api/user", UserRoutes);

module.exports = { db, app };
