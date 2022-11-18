
import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Bcrypt를 불러옴


export const bcryptPw =(req,res)=>{

const saltRounds = 10; // salt 돌리는 횟수

// Schema 정의
const {userId,userEmail,userName,userPhone,password}=req.body
const userSchema = new mongoose.Schema({
userId:  {userId},
 userEmail:{userEmail},
 password:{password},
userName: {userName},
userPhone: {userPhone},
})

// Mongoose의 pre메소드는 `Register Controller`의 save메소드가 실행되기 전에 실행된다.
// save되기 전에 Hashing을 하기 위해 pre메소드 내부에 Hash Function 작성
userSchema.pre("save", function (next) {
  const user = userSchema; // userSchema를 가르킴

  if (user.isModified('password')) {
    // password가 변경될 때만 Hashing 실행
    // genSalt: salt 생성
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hashedPassword) {
        // hash의 첫번째 인자: 비밀번호의 Plain Text
        if (err) return next(err);
        user.password = hashedPassword; // 에러없이 성공하면 비밀번호의 Plain Text를 hashedPassword로 교체해줌
        next(); // Hashing이 끝나면 save로 넘어감
      })
    })
  } else {
    // password가 변경되지 않을 때
    next(); // 바로 save로 넘어감
  }
})
}
const bcryptPw = mongoose.model("User", userSchema);
export default bcryptPw