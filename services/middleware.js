import { db } from "../app.js";
import { verifyToken } from "./jwtToken.js";

// export let tokenMiddleware = (req, res, next) => {
//   const encodedToken = req.headers.authorization.split(" ")[1];
//   const decodedToken = verifyToken(req);

//   if (encodedToken===null) {
//     res.status(400).json({ message: "토큰 발급이 필요함" });
//   return false}

// if(!decodedToken){
//   res.status(400).json({message:"토큰이 다릅니다"})
// return
// }else{
//   return next()

// }
// };
//토큰이 없다면 400 토큰이 틀리면 400 토큰이 맞다면 다음으로 넘어감
// 브라우저 헤더에 토큰이 있으면 토큰을 디코딩해서 유저의 id와 같다면 다음으로 넘어감
//디코딩한 토큰이 db user콜렉션중 일치하는 아이디가 있으면 통과시킴
// export let tokenMiddleware = (req, res, next) => {
//   const decodedToken = verifyToken(req);
//   const userObjectId = req.params.id;

//   if (decodedToken === null) {
//     res.status(400).json({ message: "토큰 발급이 필요함" });
//     return false;
//   }

//   if (decodedToken !== userObjectId) {
//     console.log(userObjectId);
//     res.status(400).json({ message: "토큰이 다릅니다" });
//     return;
//   } else {
//     return next();
//   }
// };
export let tokenMiddleware = (req, res, next) => {
  const decodedToken = verifyToken(req);

  db.collection("user").findOne({ userId: decodedToken }, (err, result) => {
    console.log("middelware==>", result);

    if (result === null) {
      res.status(400).json({ message: "토큰이 없음" });
      return false;
    }
    if (decodedToken !== result.userId) {
      res.status(400).json({ message: "토큰이 다름" });
      return;
    } else {
      return next();
    }
  });
};

//토큰이 있으면 토큰을 검사함 검사후 일치하면 다음기능으로 넘어감
