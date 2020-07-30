import Piece from "../models/Piece";
import User from "../models/User";
import dotenv from "dotenv";
dotenv.config();
export const postSearch = async (req, res) => {
  let {
    body: { field, sortingBy, list, count },
  } = req;

  if (!list) list = 0;
  if (!count) count = 30;
  if (!sortingBy || sortingBy === "D") {
    if (!field || field.length == 0) {
      // 전체 분야
      try {
        const pieces = await Piece.find()
          .sort({ created: -1 })
          .skip(list * count)
          .limit(count)
          .select("fileUrl title description like views")
          .populate({ path: "author", select: "userNickname" });
        res.json({
          result: 1,
          pieces,
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({ result: 0, message: "DB 오류" });
      }
    } else {
      // 부분 분야
      try {
        const pieces = await Piece.find()
          .where("hasField")
          .in(field)
          .sort({ created: -1 })
          .skip(list * count)
          .limit(count)
          .select("fileUrl title description like views")
          .populate({ path: "author", select: "userNickname" });
        res.json({
          result: 1,
          pieces,
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({ result: 0, message: "DB 오류" });
      }
    }
  } else if (sortingBy === "L") {
    if (!field) {
      // 전체 분야
      try {
        const pieces = await Piece.find()
          .sort({ like: -1, created: -1 })
          .skip(list * count)
          .limit(count)
          .select("fileUrl title description like views")
          .populate({ path: "author", select: "userNickname" });
        res.json({
          result: 1,
          pieces,
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({ result: 0, message: "DB 오류" });
      }
    } else {
      // 부분 분야
      try {
        const pieces = await Piece.find()
          .where("hasField")
          .in(field)
          .sort({ like: -1, created: -1 })
          .skip(list * count)
          .limit(count)
          .select("fileUrl title description like views")
          .populate({ path: "author", select: "userNickname" });
        res.json({
          result: 1,
          pieces,
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({ result: 0, message: "DB 오류" });
      }
    }
  } else if (sortingBy === "V") {
    if (!field) {
      // 전체 분야
      try {
        const pieces = await Piece.find()
          .sort({ views: -1, created: -1 })
          .skip(list * count)
          .limit(count)
          .select("fileUrl title description like views")
          .populate({ path: "author", select: "userNickname" });
        res.json({
          result: 1,
          pieces,
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({ result: 0, message: "DB 오류" });
      }
    } else {
      // 부분 분야
      try {
        const pieces = await Piece.find()
          .where("hasField")
          .in(field)
          .sort({ views: -1, created: -1 })
          .skip(list * count)
          .limit(count)
          .select("fileUrl title description like views")
          .populate({ path: "author", select: "userNickname" });
        res.json({
          result: 1,
          pieces,
        });
      } catch (e) {
        console.log(e);
        res.status(500).json({ result: 0, message: "DB 오류" });
      }
    }
  } else {
    res.json({ result: 0, message: "잘못된 형식입니다." });
  }
};
