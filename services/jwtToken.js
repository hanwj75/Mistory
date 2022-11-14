import jwt from "jsonwebtoken";

// export const loginToken = (req, res) => {
//   const { userId } = req.body;
//   const secretKey = process.env.SECRET_KEY;

//   jwt.sign({ userId }, secretKey, (err, token) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     res.status(200).json({
//       message: "로그인 성공",
//       token,
//       userId,
//       userName,
//       userEmail,
//       userPhone,
//     });
// const secretKey = process.env.SECRET_KEY;

// export const verifyToken = (req, res) => {
//   const secretKey = process.env.SECRET_KEY;
//   const tokenRaw = req.headers.authorization.split(" ")[1];
//   let token;

//   jwt.verify(tokenRaw, secretKey, (err, decoded) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     if (decoded) {
//       console.log(decoded.userId);
//       token = decoded.userId;
//       // return decoded.userId;
//     }
//     console.log("token ====>", token);
//   });

//   return token;
// };

export const verifyToken = (req, res) => {
  return new Promise((resolve, reject) => {
    const secretKey = process.env.SECRET_KEY;
    const tokenRaw = req.headers.authorization.split(" ")[1];

    jwt.verify(tokenRaw, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      }
      if (decoded) {
        resolve(decoded.userId);
      }
    });
  });
};
