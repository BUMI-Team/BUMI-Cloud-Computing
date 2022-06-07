const express = require("express");
const port = process.env.PORT || 3000;
const app = express();

const { credential } = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require("./serviceAccountKey.json");

const UserRoutes = require("./src/routes/user-routes");
const RecommenderRoutes = require("./src/routes/recommender-routes");

initializeApp({
  credential: credential.cert(serviceAccount)
})


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/recommender', RecommenderRoutes);
app.use('/api/user', UserRoutes);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}.`)
})
module.exports = getFirestore();