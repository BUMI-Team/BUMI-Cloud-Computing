import { getAuth } from "firebase-admin/auth";

export async function GetUser(req, res) {
  await getAuth()
    .getUser(req.uid)
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
      res.status(500).json({
        code: 500,
        error: error,
      });
    });
}

export async function UpdateUser(req, res) {
  const { email, phoneNumber, password, displayName, photoURL } = req.body;
  await getAuth()
    .updateUser(req.uid, {
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      displayName: displayName,
      photoURL: photoURL,
    })
    .then((userRecord) => {
      res.status(200).json({
        code: 200,
        message: "Successfully updated user",
        userRecord: userRecord,
      });
    })
    .catch((error) => {
      res.status(500).json({
        code: 500,
        error: error,
      });
    });
}
