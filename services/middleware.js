import { verifyToken } from "./jwtToken.js";

export let tokenMiddleware = (req, res, next) => {
  const encodedToken = req.headers.authorization.split(" ")[1];
  const decodedToken = verifyToken(req);
  const userId = encodedToken.userId;

  if (encodedToken == null) {
    return false;
  }
  if (!decodedToken) {
    res.status(400).json({ message: "토큰 없음" });
    return console.log("토큰없음");
  }
  if (decodedToken !== userId) {
    decodedToken;
    console.log(userId);
    console.log(decodedToken);
  }
  if (decodedToken === userId) {
    return next();
  }
  return next();
};

// 브라우저 헤더에 토큰이 있으면 토큰을 디코딩해서 유저의 id와 같다면 다음으로 넘어감1313qweqe111git g
