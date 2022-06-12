import { db } from "../../app.js";

export async function AddRecommender(req, res, next) {
  const { punya_usaha, bidang_keahlian, hobi, modal_usaha, nama_usaha } = req.body;
  const document = db.collection("users").doc(req.uid);
  await document
    .set(
      {
        punya_usaha: punya_usaha,
        bidang_keahlian: bidang_keahlian,
        hobi: hobi,
        modal_usaha: modal_usaha,
        nama_usaha: nama_usaha,
      }, 
      { merge: true }
    )
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
  const document = db.collection("users").doc(req.uid);
  await document
    .get()
    .then((doc) => {
      console.log(doc.exists)
      if (doc.exists) {
        res.status(200).json({
          code: 200,
          doc: doc.data(),
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