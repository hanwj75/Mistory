import express, { Router } from "express";
import methodOverride from "method-override";
import { config } from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";
import bcrypt from "bcrypt"
import userRouter from "./routes/user.js";
import diaryRouter from "./routes/diary.js";
import mypageRouter from "./routes/mypage.js";
import { diarysList } from "./services/userService.js";
import { tokenMiddleware } from "./services/middleware.js";

const app = express();
config();

app.use(methodOverride("_method"));
export let db;
MongoClient.connect(process.env.DB_URL, (err, client) => {
  if (err) return console.log(err);

  db = client.db("projectMistory");
  app.listen(8080, () => {
    console.log("8080");
  });
});
app.use(express.json());

app.use(cors());

app.use("/user", userRouter);
app.use("/diary", diaryRouter);

app.get("/diaries", tokenMiddleware, diarysList);
app.use("/mypage", mypageRouter);

//회원가입을 하면 db에 데이터를 저장하고 저장이 완료되면 _id를 1올려줌

// 로그인
// req로 userId, password를 받음
// 그럼 db 유저 정보 컬렉션에서 userId가 같은 데이터를 가져와
// 만약 없으면 해당하는 아이디가 없다는 메시지 + 400 보내줌
// 있으면 패스워드까지 일치하는지 검사
// 아이디, 패스워드 둘 다 일치하면
// jwt토큰 생성
// jwt토큰은 userId를 가지고 있음

//JWT TOKEN 에 ID PW EMAIL NAME PHONE 넣어서 1시간동안 유효한 TOKEN을 생성
// jwt.sign(
//   {
//     id: "userid",
//     name: "userName",
//     Email: "userEmail",
//     phone: "userPhone",
//     // exp: Math.floor(Date.now() / 1000) + 60 * 60,
//   },
//   (secreit_key = process.env.TOKEN_KEY),
//   (result) => {
//     console.log(result);
//   }
// );

// 유저가 회원탈퇴 버튼을 누르면 db의 user콜렉션에서 유저의 id번호에 맞는 오브젝트를 삭제함



