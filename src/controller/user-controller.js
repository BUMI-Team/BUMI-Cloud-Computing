const { getAuth } = require("firebase-admin/auth");

exports.GetUser = async (req, res) => {
  await getAuth()
    .getUser(req.params.uid)
    .then((userRecord) => {
      if (typeof userRecord === "undefined") {
        res.status(404).json({
          code: 404,
          message: "User not found!",
        });
      } else {
        res.status(200).json({ code: 200, userRecord: userRecord });
      }
    })
    .catch((error) => {
      res.json(error);
    });
};

exports.UpdateUser = async (req, res) => {
  const { email, phoneNumber, password, displayName, photoURL } = req.body;
  await getAuth()
    .updateUser(req.params.uid, {
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      displayName: displayName,
      photoURL: photoURL,
    })
    .then((userRecord) => {
      res.status(200).json({
        message: "Successfully updated user",
        userRecord: userRecord,
      });
    })
    .catch((error) => {
      res.status(500).json({ code: 500, error: error });
    });
};
