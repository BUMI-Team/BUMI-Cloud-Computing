const { getAuth } = require("firebase-admin/auth");

function Middleware(req, res, next) {
  const bearerToken = req.headers.authorization;
  const tokenString = bearerToken.split(" ")[1];
  getAuth()
    .verifyIdToken(tokenString)
    .then((decodedToken) => {
      req.uid = decodedToken.uid;
      req.param.uid = decodedToken.uid;
      next();
    })
    .catch((error) => {
      res.status(403).json(error);
    });
}
module.exports = Middleware;
