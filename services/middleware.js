import { verifyToken } from "./jwtToken.js";

export let tokenMiddleware = (req, res, next) => {
  const encodedToken = req.headers.authorization.split(" ")[1];
  const decodedToken = verifyToken(req);


  if (!encodedToken) {
    res.status(400).json({message:'토큰발급이 필요함'})
  }
  if (!decodedToken) {
    res.status(400).json({ message: "토큰 없음" });
    return console.log("토큰없음");
  }else{
    return next()
  }

  
};

// 브라우저 헤더에 토큰이 있으면 토큰을 디코딩해서 유저의 id와 같다면 다음으로 넘어감1313qweqe111git g
