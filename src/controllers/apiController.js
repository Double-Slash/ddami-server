import Piece from "../models/Piece";

import User from "../models/User";
import Search from "../models/Search";
import dotenv from "dotenv";
import { Mongoose } from "mongoose";
dotenv.config();
export const postSearch = async (req, res) => {
  let {
    body: { field, sortingBy, list, count, searchingBy },
  } = req;

  if (!list) list = 0;
  if (!count) count = 30;
  if (!searchingBy) {
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

          res.status(200).json({ result: 1, pieces });
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

          res.status(200).json({ result: 1, pieces });
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

          res.status(200).json({ result: 1, pieces });
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

          res.status(200).json({ result: 1, pieces });
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

          res.status(200).json({ result: 1, pieces });
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

          res.status(200).json({ result: 1, pieces });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else {
      res.json({ result: 0, message: "잘못된 형식입니다." });
    }
  } else {
    addSearch(req, res, searchingBy);
    if (!sortingBy || sortingBy === "D") {
      if (!field || field.length == 0) {
        // 전체 분야
        try {
          const pieces = await Piece.find({
            title: { $regex: searchingBy, $options: "i" },
          })
            .sort({ created: -1 })
            .skip(list * count)
            .limit(count)
            .select("fileUrl title description like views")
            .populate({ path: "author", select: "userNickname" });

          res.status(200).json({ result: 1, pieces });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          const pieces = await Piece.find({
            title: { $regex: searchingBy, $options: "i" },
          })
            .where("hasField")
            .in(field)
            .sort({ created: -1 })
            .skip(list * count)
            .limit(count)
            .select("fileUrl title description like views")
            .populate({ path: "author", select: "userNickname" });

          res.status(200).json({ result: 1, pieces });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else if (sortingBy === "L") {
      if (!field) {
        // 전체 분야
        try {
          const pieces = await Piece.find({
            title: { $regex: searchingBy, $options: "i" },
          })
            .sort({ like: -1, created: -1 })
            .skip(list * count)
            .limit(count)
            .select("fileUrl title description like views")
            .populate({ path: "author", select: "userNickname" });

          res.status(200).json({ result: 1, pieces });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          const pieces = await Piece.find({
            title: { $regex: searchingBy, $options: "i" },
          })
            .where("hasField")
            .in(field)
            .sort({ like: -1, created: -1 })
            .skip(list * count)
            .limit(count)
            .select("fileUrl title description like views")
            .populate({ path: "author", select: "userNickname" });

          res.status(200).json({ result: 1, pieces });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else if (sortingBy === "V") {
      if (!field) {
        // 전체 분야
        try {
          const pieces = await Piece.find({
            title: { $regex: searchingBy, $options: "i" },
          })
            .sort({ views: -1, created: -1 })
            .skip(list * count)
            .limit(count)
            .select("fileUrl title description like views")
            .populate({ path: "author", select: "userNickname" });

          res.status(200).json({ result: 1, pieces });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          const pieces = await Piece.find({
            title: { $regex: searchingBy, $options: "i" },
          })
            .where("hasField")
            .in(field)
            .sort({ views: -1, created: -1 })
            .skip(list * count)
            .limit(count)
            .select("fileUrl title description like views")
            .populate({ path: "author", select: "userNickname" });

          res.status(200).json({ result: 1, pieces });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else {
      res.json({ result: 0, message: "잘못된 형식입니다." });
    }
  }
};

export const getSearch = async (req, res) => {
  let {
    query: { field, sortingBy, list, count, searchingBy },
  } = req;
  let likeByMe = false;
  if (!list) list = 0;
  if (!count) count = 30;
  if (!searchingBy) {
    if (!sortingBy || sortingBy === "D") {
      if (!field || field.length == 0) {
        // 전체 분야
        try {
          console.log("검색 시작");
          const pieces = await Piece.find()
            .sort({ created: -1 })
            .skip(list * count)
            .limit(count)
            .select("fileUrl title description like likeCount views")
            .populate({ path: "author", select: "userNickname" });
          const obj = JSON.parse(JSON.stringify(pieces));
          obj.forEach((e) => {
            e.likeByMe = checkLikeUser(e.like, req);
          });
          res.status(200).json({ result: 1, pieces: obj });
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

          res.status(200).json({ result: 1, pieces });
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

          res.status(200).json({ result: 1, pieces });
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

          res.status(200).json({ result: 1, pieces });
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

          res.status(200).json({ result: 1, pieces });
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

          res.status(200).json({ result: 1, pieces });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else {
      res.json({ result: 0, message: "잘못된 형식입니다." });
    }
  } else {
    addSearch(req, res, searchingBy);
    if (!sortingBy || sortingBy === "D") {
      if (!field || field.length == 0) {
        // 전체 분야
        try {
          const pieces = await Piece.find({
            title: { $regex: searchingBy, $options: "i" },
          })
            .sort({ created: -1 })
            .skip(list * count)
            .limit(count)
            .select("fileUrl title description like views")
            .populate({ path: "author", select: "userNickname" });

          res.status(200).json({ result: 1, pieces });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          const pieces = await Piece.find({
            title: { $regex: searchingBy, $options: "i" },
          })
            .where("hasField")
            .in(field)
            .sort({ created: -1 })
            .skip(list * count)
            .limit(count)
            .select("fileUrl title description like views")
            .populate({ path: "author", select: "userNickname" });

          res.status(200).json({ result: 1, pieces });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else if (sortingBy === "L") {
      if (!field) {
        // 전체 분야
        try {
          const pieces = await Piece.find({
            title: { $regex: searchingBy, $options: "i" },
          })
            .sort({ like: -1, created: -1 })
            .skip(list * count)
            .limit(count)
            .select("fileUrl title description like views")
            .populate({ path: "author", select: "userNickname" });

          res.status(200).json({ result: 1, pieces });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          const pieces = await Piece.find({
            title: { $regex: searchingBy, $options: "i" },
          })
            .where("hasField")
            .in(field)
            .sort({ like: -1, created: -1 })
            .skip(list * count)
            .limit(count)
            .select("fileUrl title description like views")
            .populate({ path: "author", select: "userNickname" });

          res.status(200).json({ result: 1, pieces });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else if (sortingBy === "V") {
      if (!field) {
        // 전체 분야
        try {
          const pieces = await Piece.find({
            title: { $regex: searchingBy, $options: "i" },
          })
            .sort({ views: -1, created: -1 })
            .skip(list * count)
            .limit(count)
            .select("fileUrl title description like views")
            .populate({ path: "author", select: "userNickname" });

          res.status(200).json({ result: 1, pieces });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          const pieces = await Piece.find({
            title: { $regex: searchingBy, $options: "i" },
          })
            .where("hasField")
            .in(field)
            .sort({ views: -1, created: -1 })
            .skip(list * count)
            .limit(count)
            .select("fileUrl title description like views")
            .populate({ path: "author", select: "userNickname" });

          res.status(200).json({ result: 1, pieces });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else {
      res.json({ result: 0, message: "잘못된 형식입니다." });
    }
  }
};

const checkLikeUser = (data, req) => {
  if (!req.decoded) {
    return false;
  } else {
    return data.some((e) => e === req.decoded._id);
  }
};

const addSearch = async (req, res, searchingBy) => {
  if (req.decoded) {
    try {
      const user = await Search.findOne({ user: req.decoded._id });
      if (user !== null) {
        if (user.searches.length < 10) {
          user.searches.push(searchingBy);
          user.save();
        } else {
          user.searches.shift();
          user.searches.push(searchingBy);
          user.save();
        }
      } else {
        const search = await Search({
          user: req.decoded._id,
          searches: searchingBy,
        });
        await Search.create(search);
      }
    } catch (e) {
      console.log(e);
      res.json({ result: 0, message: "DB 오류" });
    }
  }
};

export const addLike = async (req, res) => {
  const {
    params: { id },
  } = req;
  console.log(id);
  const piece = await Piece.findOne({ _id: id });
  const user = await User.findOne({ _id: req.decoded._id });
  if (req.decoded) {
    piece.like.push(req.decoded._id);
    piece.save((err) => {
      if (err) {
      }
      user.like = id;
      user.save();
    });
  }
};
