import { db } from "../../app.js";

export async function AddRecommender(req, res, next) {
  const { jenisUsaha, kategoriUsaha, rekomendasi } = req.body;
  const document = db.collection("recommender").doc();
  await document
    .set({
      uid: req.uid,
      jenisUsaha: jenisUsaha,
      kategoriUsaha: kategoriUsaha,
      rekomendasi: rekomendasi,
    })
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "Successfully added recommender with ID: " + document.id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        code: 500,
        error: error,
      });
    });
}

export async function AddInputRecommender(req, res, next) { 
  const { punyaUsaha, bidangKeahlian, hobi, modalUsaha, namaUsaha } = req.body;
  const document = db.collection("inputRecommender").doc();
  await document
    .set({
      uid: req.uid,
      punyaUsaha: punyaUsaha,
      bidangKeahlian: bidangKeahlian,
      hobi: hobi,
      modalUsaha: modalUsaha,
      namaUsaha: namaUsaha,
    })
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "Successfully added input recommender with ID: " + document.id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        code: 500,
        error: error,
      });
    });
}

export async function GetRecommender(req, res, next) {
  const document = db.collection("recommender").where("uid", "==", req.uid);
  await document
    .get()
    .then((snapshot) => {
      if (snapshot.docs.length > 0) {
        res.status(200).json({
          code: 200,
          snapshot: snapshot.docs[0].data()
        });
      } else {
        res.status(404).json({
          code: 404,
          message: "Document does not exist!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        code: 500,
        error: error,
      });
    });
}

export async function GetInputRecommender(req, res, next) {
  const document = db.collection("inputRecommender").where("uid", "==", req.uid);
  await document
    .get()
    .then((snapshot) => {
      if (snapshot.docs.length > 0) {
        res.status(200).json({
          code: 200,
          snapshot: snapshot.docs[0].data()
        });
      } else {
        res.status(404).json({
          code: 404,
          message: "Document does not exist!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        code: 500,
        error: error,
      });
    });
}
