import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";

export const authenticateJWT = (req, res, next) => {
  let jwtToken = req.headers["authorization"]?.split(" ")[1];
  if (!jwtToken) {
    return res.sendStatus(403);
  }

  jwt.verify(jwtToken, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
