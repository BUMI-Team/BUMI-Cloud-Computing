exports.AddRecommender = async (req, res, next) => {
  const db = require("../../app");
  const { jenisUsaha, kategoriUsaha } = req.body;
  const document = db.collection("recommender").doc(req.uid);
  await document
    .set({
      jenisUsaha: jenisUsaha,
      kategoriUsaha: kategoriUsaha,
    })
    .then(() => {
      res.status(200).json({
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
  const db = require("../../app");
  const document = db.collection("recommender").doc(req.params.uid);
  await document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        res.status(404).json({
          message: "Document does not exist!",
        });
      } else {
        res.status(200).json(doc.data());
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: error,
      });
    });
};
