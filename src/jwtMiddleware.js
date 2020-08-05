import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Piece from "./models/Piece";
dotenv.config();

const loginUser = new Object();

export const jwtMiddleware = async (req, res, next) => {
  const token = req.headers["x-access-token"] || req.query.token;
  if (!token || token === "") {
    next();
  } else {
    await jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (!err) {
        req.decoded = decoded;
        console.log("세션 로그인 성공");
        next();
      } else {
        res.status(403).json({
          result: "fail",
          message: "Token error. 다시 로그인 해주세요.",
        });
      }
    });
  }
};

export const checkUser = (req, res, next) => {
  if (req.decoded) {
    next();
  } else {
    res.status(401).json({ result: 0, message: "로그인 먼저 해주세요" });
  }
};

export const checkViewUser = async (req, res, next) => {
  const ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

  if (!loginUser[req.params.id]) {
    loginUser[req.params.id] = [];
  }
  if (loginUser[req.params.id].indexOf(ip) == -1) {
    //ip 없으면조회수 증가
    loginUser[req.params.id].push(ip);
    const piece = await Piece.findById(req.params.id);
    if (piece !== null) {
      piece.views++;
      piece.save();
    }
    //10분이 지나면 배열에서 삭제
    setTimeout(() => {
      loginUser[req.params.id].splice(loginUser[req.params.id].indexOf(ip), 1);
    }, 600000);

    for (let i in loginUser) {
      //공간 절약을 위해 ip가 하나도 없으면 해당 오브젝트 삭제
      if (loginUser[i].length == 0) {
        delete loginUser.i;
      }
    }
  }
  next();
};
