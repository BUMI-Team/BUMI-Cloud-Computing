// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { port, firebaseConfig } from "./config.js";
import { authRoutes } from './src/routes/auth-routes.js';
import express from "express";
import bodyParser from "body-parser";

const expressApp = express();

expressApp.use(bodyParser.json());
expressApp.use(
  express.urlencoded({
    extended: true,
  })
);
expressApp.use('/api/auth', authRoutes);
expressApp.listen(port, () => {
  console.log(`Server is running on PORT ${port}.`);
});

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export { firebaseApp };