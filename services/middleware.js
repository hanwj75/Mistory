import { db } from "../app.js";
import { verifyToken } from "./jwtToken.js";

export let tokenMiddleware = async(req, res, next) => {
  
  const encodedToken= req.headers.authorization.split(" ")[1]
  const decodedToken = verifyToken(req);

  if(encodedToken == null){
    return false
  }


}

// 브라우저 헤더에 토큰이 있으면 토큰을 디코딩해서 유저의 id와 같다면 다음으로 넘어감1313qweqe111git g
