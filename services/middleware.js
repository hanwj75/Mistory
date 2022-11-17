import { verifyToken } from "./jwtToken.js";

export let tokenMiddleware = (req, res, next) => {
  const encodedToken = req.headers.authorization.split(" ")[1];
  const decodedToken = verifyToken(req);


  if (!encodedToken) {
    res.status(400).json({message:'토큰 발급이 필요함'})
  return console.log('토큰 없음')}
  if (!decodedToken) {
    res.status(400).json({ message: "토큰 검증이 필요함" });
    return console.log("토큰 검증실패");
  }else{
    return next()
  }

  
};
//토큰이 없다면 400 토큰이 틀리면 400 토큰이 맞다면 다음으로 넘어감
// 브라우저 헤더에 토큰이 있으면 토큰을 디코딩해서 유저의 id와 같다면 다음으로 넘어감


