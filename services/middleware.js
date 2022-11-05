import jwt from "jsonwebtoken";

// import { verifyToken } from "./jwtToken.js";

// export const authorizationToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.jsonstatus(200), next(), verifyToken;
// };

// export const verifyToken = (req, res, next) => {
//   const secretKey = process.env.SECRET_KEY;

//   jwt.verify(req.headers.authorization, secretKey);
//   console.log(req.headers.authorization);

//   return next();
// };

export let verifyToken = (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;
  const token = req.headers.authorization;
  const userId = req.headers.userId;
  jwt.verify(token, secretKey, (err, result) => {
    console.log(token);
    console.log(result);

    if (token !== userId) {
      return res.status(400).json({ message: "토큰오류", err });
    }
    if (token === userId) {
      res.status(200).json({ message: "토큰확인" });
      return next();
    }
  });
};
