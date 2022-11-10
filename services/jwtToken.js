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

export const verifySignToken = (req, res) => {
  const secretKey = process.env.SECRET_KEY;
  jwt.verify(token, secretKey, (err, decoded) => {
    console.log(token);
    if (!decoded) {
      res.status(400).json({ message: "토큰오류", err });
    }
    if (decoded) {
      res.status(200).json({ message: "토큰확인", decoded });
    }
  });
};
