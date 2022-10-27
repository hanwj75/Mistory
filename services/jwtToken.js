import jwt from "jsonwebtoken";

export const loginToken = (req, res) => {
  const secretKey = process.env.SECRET_KEY;

  jwt.sign({ userId }, secretKey, (err, token) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json({ token });
  });
};

export const userToken = (req, res) => {
  const secretKey = process.env.SECRET_KEY;
  jwt.verify({ token }, secretKey, (err, result) => {
    if (err) {
      res.json({ result });
    }
  });
};
