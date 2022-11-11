import { verifyToken } from "./jwtToken.js";

export let tokenMiddleware = (req, res, next) => {
  const userId = req.body.userId;
  const authorizationToken = req.headers.authorization.split(" ")[1];
  const decodedToken = verifyToken;

  if (authorizationToken !== userId) {
    decodedToken;
    console.log(userId);
    console.log(authorizationToken);
  }

  if (authorizationToken === userId) {
    console.log(decoded);
    res.status(200).json({ message: "토큰 확인!", decoded });
    return next();
  }
};

// 브라우저 헤더에 토큰이 있으면 토큰을 디코딩해서 유저의 id와 같다면 다음으로 넘어감
