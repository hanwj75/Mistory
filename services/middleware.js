
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
export let tokenMiddleware = (req, res, next) => {
 
  const decodedToken = verifyToken(req);
const userObjectId=req.params.id

  if (decodedToken===null) {
    res.status(400).json({ message: "토큰 발급이 필요함" });
  return false}

if(decodedToken!==userObjectId){
  console.log(userObjectId)
  res.status(400).json({message:"토큰이 다릅니다"})
return
}else{
  return next()
 
}
};

//토큰이 있으면 토큰을 검사함 검사후 일치하면 다음기능으로 넘어감

export let tokenMiddleware2 = (req, res, next) => {
 
  const decodedToken = verifyToken(req);


  if (decodedToken===null) {
    res.status(400).json({ message: "토큰 발급이 필요함" });
  return false}

if(!decodedToken){
  console.log(userObjectId)
  res.status(400).json({message:"토큰이 다릅니다"})
return
}else{
  return next()
 
}
};

export let tokenMiddleware3 = (req, res, next) => {
 
  const decodedToken = verifyToken(req);
const userDiaryId= { _id: parseInt(req.params.id) }

  if (decodedToken===null) {
    res.status(400).json({ message: "토큰 발급이 필요함" });
  return false}

if(!decodedToken&&!userDiaryId){
  console.log(userDiaryId)
  res.status(400).json({message:"토큰이 다릅니다"})
return
}else{
  return next()
 
}
};

// 일기삭제 미들웨어 수정중