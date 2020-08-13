import Product from "../models/Product";
import Material from "../models/Material";
import User from "../models/User";
import Piece from "../models/Piece";
import { converter } from "../university";
import { AllSearch, Searching } from "./productSearchController";
import { AllSearch2, Searching2 } from "./materialSearchController";
import { addSearch } from "./apiController";

export const uploadPiece = async (req, res) => {
  const {
    body: { pieces, title, price, description, hasField, locationName },
  } = req; // pieces는 id 배열
  const user = await User.findById(req.decoded._id);
  console.log(user);
  if (user === null)
    res.json({ result: 0, message: "사라지거나 없어진 계정입니다." });
  else if (user.state === false)
    res.json({ result: 0, message: "미대생 인증을 먼저 해주세요" });
  else if (!pieces)
    res.json({ result: 0, message: "작품을 하나 이상 선택해주세요" });
  else if (!checkMyPiece(pieces, user))
    res.json({ result: 0, message: "잘못된 접근이거나 없는 작품입니다." });
  else {
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
      await Product.create(product);
      for (const e of pieces) {
        await Piece.findByIdAndUpdate(e, { state: 1 }, (err) => {
          if (err) {
            console.log(err);
            return;
          }
        });
      }
      res.json({
        result: 1,
        message: "성공적으로 따미 작품샾에 업로드 하였습니다.",
      });
    } catch (err) {
      console.log(err);
      res.json({ result: 0, message: "DB 오류" });
    }
  }
};

export const uploadMaterial = async (req, res) => {
  console.log(req);
  //내껀지 검증먼저 pieces
  const {
    body: { title, price, description, hasField, locationName },
  } = req;
  const user = await User.findById(req.decoded._id);
  if (user === null)
    res.json({ result: 0, message: "사라지거나 없어진 계정입니다." });
  else {
    try {
      const fileUrl = [];

      if (req.files) {
        if (req.files.length == 0)
          fileUrl.push(`${process.env.BASE_URL}/uploads/material.jpg`);
        else {
          for (var e of req.files)
            fileUrl.push(`${process.env.BASE_URL}/uploads/${e.filename}`);
        }
      }
      const material = await Material({
        fileUrl,
        title,
        price,
        description,
        author: req.decoded._id,
        hasField,
        locationName,
        location: converter(locationName),
      });
      await Material.create(material);

      res.json({
        result: 1,
        message: "성공적으로 따미 재료샾에 업로드 하였습니다.",
      });
    } catch (err) {
      console.log(err);
      res.json({ result: 0, message: "DB 오류" });
    }
  }
};

export const searchProduct = async (req, res) => {
  let {
    body: { field, sortingBy, list, count, searchingBy, location },
  } = req;

  !list ? (list = 0) : (list = +list);
  !count ? (count = 30) : (count = +count);

  if (!searchingBy || searchingBy === "") {
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
      if (!location) {
        res.json({ result: 0, message: "위치정보를 입력해주세요." });
        return;
      }
      if (!field) {
        // 전체 분야
        try {
          let obj = await AllSearch.allSearchByDistance(list, count, location);
          await Product.populate(
            obj,
            { path: "pieces", select: "fileUrl" },
            function (err, products) {
              if (err) res.json(err);
              else {
                obj = documentToJSON(req, products);
                res.status(200).json({ result: 1, products: obj });
              }
            }
          );
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await AllSearch.allSearchByDistance(
            field,
            list,
            count,
            location
          );
          await Product.populate(
            obj,
            { path: "pieces", select: "fileUrl" },
            function (err, products) {
              if (err) res.json(err);
              else {
                obj = documentToJSON(req, products);
                res.status(200).json({ result: 1, products: obj });
              }
            }
          );
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
      if (!location) {
        res.json({ result: 0, message: "위치정보를 입력해주세요." });
        return;
      }
      if (!field) {
        // 전체 분야
        try {
          let obj = await Searching.searchByDistance(
            list,
            count,
            searchingBy,
            location
          );
          await Product.populate(
            obj,
            { path: "pieces", select: "fileUrl" },
            function (err, products) {
              if (err) res.json(err);
              else {
                obj = documentToJSON(req, products);
                res.status(200).json({ result: 1, products: obj });
              }
            }
          );
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
            searchingBy,
            location
          );
          await Product.populate(
            obj,
            { path: "pieces", select: "fileUrl" },
            function (err, products) {
              if (err) res.json(err);
              else {
                obj = documentToJSON(req, products);
                res.status(200).json({ result: 1, products: obj });
              }
            }
          );
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

export const searchMaterial = async (req, res) => {
  let {
    body: { field, sortingBy, list, count, searchingBy, location },
  } = req;

  !list ? (list = 0) : (list = +list);
  !count ? (count = 30) : (count = +count);

  if (!searchingBy || searchingBy === "") {
    if (!sortingBy || sortingBy === "D") {
      if (!field || field.length == 0) {
        // 전체 분야
        try {
          let obj = await AllSearch2.allSearch(list, count);
          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await AllSearch2.fieldSearch(field, list, count);
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
          let obj = await AllSearch2.allSearchByLike(list, count);
          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await AllSearch2.allFieldSearchByLike(field, list, count);
          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      }
    } else if (sortingBy === "T") {
      if (!location) {
        res.json({ result: 0, message: "위치정보를 입력해주세요." });
        return;
      }
      if (!field) {
        // 전체 분야
        try {
          let obj = await AllSearch2.allSearchByDistance(list, count, location);
          await Product.populate(
            obj,
            { path: "pieces", select: "fileUrl" },
            function (err, products) {
              if (err) res.json(err);
              else {
                obj = documentToJSON(req, products);
                res.status(200).json({ result: 1, products: obj });
              }
            }
          );
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await AllSearch2.allSearchByDistance(
            field,
            list,
            count,
            location
          );
          await Product.populate(
            obj,
            { path: "pieces", select: "fileUrl" },
            function (err, products) {
              if (err) res.json(err);
              else {
                obj = documentToJSON(req, products);
                res.status(200).json({ result: 1, products: obj });
              }
            }
          );
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
          let obj = await Searching2.search(list, count, searchingBy);
          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await Searching2.fieldSearch(list, count, searchingBy);
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
          let obj = await Searching2.searchByLike(list, count, searchingBy);

          obj = documentToJSON(req, obj);
          res.status(200).json({ result: 1, products: obj });
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await Searching2.fieldSearchByLike(
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
      if (!location) {
        res.json({ result: 0, message: "위치정보를 입력해주세요." });
        return;
      }
      if (!field) {
        // 전체 분야
        try {
          let obj = await Searching2.searchByDistance(
            list,
            count,
            searchingBy,
            location
          );
          await Product.populate(
            obj,
            { path: "pieces", select: "fileUrl" },
            function (err, products) {
              if (err) res.json(err);
              else {
                obj = documentToJSON(req, products);
                res.status(200).json({ result: 1, products: obj });
              }
            }
          );
        } catch (e) {
          console.log(e);
          res.status(500).json({ result: 0, message: "DB 오류" });
        }
      } else {
        // 부분 분야
        try {
          let obj = await Searching2.fieldSearchByDistance(
            field,
            list,
            count,
            searchingBy,
            location
          );
          await Product.populate(
            obj,
            { path: "pieces", select: "fileUrl" },
            function (err, products) {
              if (err) res.json(err);
              else {
                obj = documentToJSON(req, products);
                res.status(200).json({ result: 1, products: obj });
              }
            }
          );
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

export const getProductDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const product = await Product.findOne({ _id: id })
    .select("title hasField price like locationName description")
    .populate({
      path: "author",
      select: "imageUrl userId userName",
    });
  if (product == null)
    res.json({ result: 0, message: "없거나 사라진 상품입니다." });
  else {
    const obj = product.toObject();
    obj.likeByUser = checkLike(product.like, req);
    res.json({ result: 1, product: obj });
  }
};

export const getMaterialDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const material = await Material.findOne({ _id: id })
    .select("title hasField price like locationName description")
    .populate({
      path: "author",
      select: "imageUrl userId userName",
    });

  if (material == null)
    res.json({ result: 0, message: "없거나 사라진 재료입니다." });
  else {
    const obj = material.toObject();
    obj.likeByUser = checkLike(material.like, req);
    res.json({ result: 1, material: obj });
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

const checkMyPiece = (pieces, user) => {
  console.log(user);
  for (const e of pieces) {
    console.log(e);
    if (user.myPieces.indexOf(e) === -1) return false;
  }
  return true;
};
