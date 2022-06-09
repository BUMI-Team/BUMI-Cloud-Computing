import { getAuth } from "firebase-admin/auth";

function Middleware(req, res, next) {
  const bearerToken = req.headers.authorization;
  const tokenString = bearerToken.split(" ")[1];
  getAuth()
    .verifyIdToken(tokenString)
    .then((decodedToken) => {
      req.uid = decodedToken.uid;
      next();
    })
    .catch((error) => {
      res.status(403).json({
        code: 403,
        error: error,
      });
    });
}

export default Middleware;
