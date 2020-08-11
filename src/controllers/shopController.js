import Product from "../models/Product";
import User from "../models/User";
import Piece from "../models/Piece";
import { converter } from "../university";
import { AllSearch, Searching } from "./shopSearchController";

export const uploadPiece = async (req, res) => {
  //내껀지 검증먼저 pieces
  const {
    body: { pieces, title, price, description, hasField, locationName },
  } = req; // pieces는 id 배열
  const user = await User.findById(req.decoded._Id);
  try {
    const product = await Product({
      pieces,
      title,
      price,
      description,
      author: req.decoded._id,
      hasField,
      locationName,
      location: converter(locationName),
    });
    const madeProduct = await Product.create(product);
    await Piece.findByIdAndUpdate(madeProduct._id, { state: 1 }, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    res.json({
      result: 1,
      message: "성공적으로 따미 작품샾에 업로드 하였습니다.",
    });
  } catch (err) {
    console.log(err);
    res.json({ result: 0, message: "DB 오류" });
  }
};

export const searchProduct = async (req, res) => {
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
          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await AllSearch.fieldSearch(field, list, count);
          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
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
          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await AllSearch.allFieldSearchByLike(field, list, count);
          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else if (sortingBy === "T") {
      if (!field) {
        // 전체 분야
        try {
          let obj = await AllSearch.allSearchByDistance(list, count);
          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await AllSearch.allSearchByView(field, list, count);
          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
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
          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await Searching.fieldSearch(list, count, searchingBy);
          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
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
          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
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
          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else if (sortingBy === "T") {
      if (!field) {
        // 전체 분야
        try {
          let obj = await Searching.searchByDistance(list, count, searchingBy);
          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await Searching.fieldSearchByDistance(
            field,
            list,
            count,
            searchingBy
          );
          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
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

const checkLike = (data, req) => {
  if (!req.decoded) {
    return false;
  } else {
    return data.some((e) => e === req.decoded._id);
  }
};

const documentToJSON = (req, documents) => {
  let obj = JSON.parse(JSON.stringify(documents));
  obj.forEach((e) => {
    e.likeByMe = checkLike(e.like, req);
  });
  return obj;
};