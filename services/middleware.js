import { verifyToken } from "./jwtToken.js";

export let tokenMiddleware = async (req, res, next) => {
  const userId = req.body.userId;
  // const authorizationToken = req.headers.authorization.split(" ")[1];
  const decodedToken = await verifyToken(req);
  // decodedToken;

  console.log("---->", decodedToken);
};

// 브라우저 헤더에 토큰이 있으면 토큰을 디코딩해서 유저의 id와 같다면 다음으로 넘어감1313qweqe111
