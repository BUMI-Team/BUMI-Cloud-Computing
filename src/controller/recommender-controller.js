exports.AddRecommender = async (req, res, next) => {
  const { db } = require("../../app");
  const { jenisUsaha, kategoriUsaha } = req.body;
  const document = db.collection("recommender").doc();
  await document
    .set({
      uid: req.uid,
      jenisUsaha: jenisUsaha,
      kategoriUsaha: kategoriUsaha,
    })
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "Successfully added recommender with ID: " + document.id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};

exports.GetRecommender = async (req, res, next) => {
  const { db } = require("../../app");
  const document = db.collection("recommender").where("uid", "==", req.uid);
  await document
    .get()
    .then((snapshot) => {
      if (snapshot.docs.length > 0) {
        res.status(200).json(snapshot.docs[0].data());
      } else {
        res.status(404).json({
          code: 404,
          message: "Document does not exist!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};
