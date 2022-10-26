import jwt from "jsonwebtoken";
import { db } from "../app.js";

//user
//회원가입
export const userData = (req, res) => {
  db.collection("user").insertOne(
    {
      userId: req.body.userId,
      password: req.body.password,
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPhone: req.body.userPhone,
    },
    (err, result) => {
      res.json({ join: result });
    }
  );
};

//로그인
export const userLogin = (req, res) => {
  const { userId, password } = req.body;
  db.collection("user").findOne({ userId: userId, password: password }, (err, result) => {
    if (!result) {
      res.status(400).json({ message: "아이디가 틀렸습니다." });
      return;
    }
    console.log(result);
    if (result.password !== password) {
      res.status(400).json({ message: "비밀번호가 틀렸습니다." });
      return;
    }
  });
};
//회원탈퇴
// 삭제하려는 계정의 id와 db에 user콜렉션에 저장된 userId와 일치하면 삭제시켜줌
export const userRemove = (req, res) => {
  db.collection("user").deleteOne(req.body, (err, result) => {
    console.log("삭제완료");
    res.status(200).json({ message: "삭제성공" });
    if (!result) {
      res.status(400).json({ message: "삭제실패" });
    }
  });
};
//diary

//일기 쓰기
export const writeService = (req, res) => {
  const diaryPost = req.body.contents;

  db.collection("diaryCounter").findOne({ name: "diaryNumber" }, (err, result) => {
    console.log(result.allDiary);
    let allDiaryList = result.allDiary;
    let createdAt = new Date();

    db.collection("diary").insertOne(
      {
        _id: allDiaryList + 1,
        contents: diaryPost,
        createdAt,
      },
      function (err, result) {
        console.log(createdAt);
        console.log(result);
        db.collection("diaryCounter").updateOne(
          { name: "diaryNumber" },
          { $inc: { allDiary: 1 } },
          function (err, result) {
            if (err) {
              return console.log(err);
            }
          }
        );
      }
    );
  });
};

//일기 수정하기

//db에 콜렉선 다이어리에 저장된 콘텐츠오브젝트 중 하나를 찾아서 수정 후 업데이트 해줌
export const diaryUpdates = (req, res) => {
  const { contents } = req.body;
  const updatedAt = new Date();

  db.collection("diary").updateOne(
    { _id: parseInt(req.params.id) },
    { $set: { contents, updatedAt: updatedAt } },
    (err, result) => {
      if (!result) {
        res.status(400).json({ message: "수정실패" });
      }
    }
  );
};
