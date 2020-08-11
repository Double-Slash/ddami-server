import Piece from "../models/Piece";
import { AllSearch, Searching } from "./searchController";
import User from "../models/User";
import Search from "../models/Search";
import Home from "../models/Home";
import dotenv from "dotenv";
import { Mongoose } from "mongoose";
dotenv.config();

export const getAuthorSearch = async (req, res) => {
  let {
    query: { list, count, searchingBy },
  } = req;
  !list ? (list = 0) : (list = +list);
  !count ? (count = 30) : (count = +count);
  if (!searchingBy) {
    try {
      const authors = await User.find()
        .sort({ followerCount: -1 })
        .skip(list * count)
        .limit(count)
        .select("userName likeField")
        .populate({ path: "home", select: "imageUrl stateMessage" });
      let obj = JSON.parse(JSON.stringify(authors));
      obj.forEach((e) => {
        e.followByMe = checkInclude(e.follower, req);
      });

      res.json({ result: 0, authors: obj });
    } catch (e) {
      console.log(e);
    }
  } else {
    const authors = await User.find({
      userName: { $regex: searchingBy, $options: "i" },
    })
      .sort({ followerCount: -1 })
      .skip(list * count)
      .limit(count)
      .select("userName likeField")
      .populate({ path: "home", select: "imageUrl stateMessage" });
    let obj = JSON.parse(JSON.stringify(authors));
    obj.forEach((e) => {
      e.followByMe = checkInclude(e.follower, req);
    });

    res.json({ result: 0, authors: obj });
  }
};

export const postAuthorSearch = async (req, res) => {
  let {
    body: { list, count, searchingBy },
  } = req;
  !list ? (list = 0) : (list = +list);
  !count ? (count = 30) : (count = +count);
  if (!searchingBy) {
    try {
      const authors = await User.find()
        .sort({ followerCount: -1 })
        .skip(list * count)
        .limit(count)
        .select("userName likeField")
        .populate({ path: "home", select: "imageUrl stateMessage" });
      let obj = JSON.parse(JSON.stringify(authors));
      obj.forEach((e) => {
        e.followByMe = checkInclude(e.follower, req);
      });

      res.json({ result: 0, authors: obj });
    } catch (e) {
      console.log(e);
    }
  } else {
    const authors = await User.find({
      userName: { $regex: searchingBy, $options: "i" },
    })
      .sort({ followerCount: -1 })
      .skip(list * count)
      .limit(count)
      .select("userName likeField")
      .populate({ path: "home", select: "imageUrl stateMessage" });
    let obj = JSON.parse(JSON.stringify(authors));
    obj.forEach((e) => {
      e.followByMe = checkInclude(e.follower, req);
    });

    res.json({ result: 0, authors: obj });
  }
};

export const postSearch = async (req, res) => {
  let {
    body: { field, sortingBy, list, count, searchingBy },
  } = req;

  !list ? (list = 0) : (list = +list);
  !count ? (count = 30) : (count = +count);

  if (!searchingBy) {
    if (!sortingBy || sortingBy === "D") {
      if (!field || field.length == 0) {
        // 전체 분야
        try {
          let obj = await AllSearch.allSearch(list, count);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await AllSearch.fieldSearch(field, list, count);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else if (sortingBy === "L") {
      if (!field) {
        // 전체 분야
        try {
          let obj = await AllSearch.allSearchByLike(list, count);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await AllSearch.allFieldSearchByLike(field, list, count);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else if (sortingBy === "V") {
      if (!field) {
        // 전체 분야
        try {
          let obj = await AllSearch.allSearchByView(list, count);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await AllSearch.allSearchByView(field, list, count);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
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
          let obj = await Searching.search(list, count, searchingBy);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await Searching.fieldSearch(list, count, searchingBy);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else if (sortingBy === "L") {
      if (!field) {
        // 전체 분야
        try {
          let obj = await Searching.searchByLike(list, count, searchingBy);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await Searching.fieldSearchByLike(
            field,
            list,
            count,
            searchingBy
          );
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else if (sortingBy === "V") {
      if (!field) {
        // 전체 분야
        try {
          let obj = await Searching.searchByView(list, count, searchingBy);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await Searching.fieldSearchByView(
            field,
            list,
            count,
            searchingBy
          );
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
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

  !list ? (list = 0) : (list = +list);
  !count ? (count = 30) : (count = +count);

  if (!searchingBy) {
    if (!sortingBy || sortingBy === "D") {
      if (!field || field.length == 0) {
        // 전체 분야
        try {
          let obj = await AllSearch.allSearch(list, count);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await AllSearch.fieldSearch(field, list, count);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else if (sortingBy === "L") {
      if (!field) {
        // 전체 분야
        try {
          let obj = await AllSearch.allSearchByLike(list, count);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await AllSearch.allFieldSearchByLike(field, list, count);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else if (sortingBy === "V") {
      if (!field) {
        // 전체 분야
        try {
          let obj = await AllSearch.allSearchByView(list, count);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await AllSearch.allSearchByView(field, list, count);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
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
          let obj = await Searching.search(list, count, searchingBy);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await Searching.fieldSearch(list, count, searchingBy);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else if (sortingBy === "L") {
      if (!field) {
        // 전체 분야
        try {
          let obj = await Searching.searchByLike(list, count, searchingBy);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await Searching.fieldSearchByLike(
            field,
            list,
            count,
            searchingBy
          );
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else if (sortingBy === "V") {
      if (!field) {
        // 전체 분야
        try {
          let obj = await Searching.searchByView(list, count, searchingBy);
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await Searching.fieldSearchByView(
            field,
            list,
            count,
            searchingBy
          );
          obj = docToJSON(req, obj);
          res.status(200).json({ result: 1, pieces: obj });
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

export const addSearch = async (req, res, searchingBy) => {
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

const checkInclude = (data, req) => {
  if (!req.decoded) {
    return false;
  } else {
    return data.some((e) => e === req.decoded._id);
  }
};

export const docToJSON = (req, documents) => {
  let obj = JSON.parse(JSON.stringify(documents));
  obj.forEach((e) => {
    e.likeByMe = checkInclude(e.like, req);
  });
  return obj;
};
