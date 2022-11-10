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
  db.collection("user").findOne({ userId: userId }, (err, result) => {
    const { userName, userEmail, userId, userPhone } = result;

    if (!result) {
      res.status(400).json({ message: "아이디가 틀렸습니다." });
      return;
    }
    console.log(result);
    if (result.password !== password) {
      res.status(400).json({ message: "비밀번호가 틀렸습니다." });
      return;
    }
    if (result) {
      const secretKey = process.env.SECRET_KEY;

      jwt.sign({ userId }, secretKey, (err, token) => {
        if (err) {
          console.log(err);
          return;
        }
        res.status(200).json({
          message: "로그인 성공",
          token,
          userId,
          userName,
          userEmail,
          userPhone,
        });
      });
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
    { _id: parseInt(req.body.id) },
    { $set: { contents, updatedAt: updatedAt } },
    (err, result) => {
      if (!result) {
        res.status(400).json({ message: "수정실패" });
      }
    }
  );
};

//일기 삭제하기

//diary 콜렉션에 있는 데이터중 _id가 내가 삭제한 게시물의 _id와 같으면 삭제시켜줌

export const diaryRemove = (req, res) => {
  db.collection("diary").deleteOne({ _id: parseInt(req.body.id) }, (err, result) => {
    console.log("삭제완료");
    res.status(200).json({ message: "삭제성공" });
    if (!result) {
      res.status(400).json({ message: "삭제실패" });
    }
  });
};

//일기 목록
//diary 콜렉션에 있는 파일 전부 보여줌
export const diarysList = (req, res) => {
  db.collection("diary")
    .find()
    .toArray((err, result) => {
      res.json({ result });
      console.log(result);
    });
};

//마이페이지
//로그인한 사람이 마이페이지로 들어가면 id,이름,이메일,폰번호를 보여줌
export const userPage = (req, res) => {
  db.collection("user").findOne({ userId: req.params.id }, (err, result) => {
    console.log(result);
    const { userId, userName, userEmail, userPhone } = result;
    res.json({ userId: userId, userName, userEmail, userPhone });
  });
};

//마이페이지 회원정보 수정
//회원정보 수정 요청이 오면 이메일,폰번호,비밀번호를 바꿀수있음
//db의 있는 유저의 데이터중 id가 일치하는 데이터의 정보를 수정한 데이터로 업데이트함

export const userPageUpdate = (req, res) => {
  const { userEmail, userPhone, password } = req.body;
  db.collection("user").updateOne(
    { userId: req.params.id },
    {
      $set: { userEmail, userPhone, password },
    },
    (err, result) => {
      res.status(200).json({ message: "수정성공" });
      if (!result) {
        res.status(400).json({ message: "수정실패" });
      }
    }
  );
};
//ㄴㅁㅇㅁㄴㅇ
