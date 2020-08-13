import express from "express";

import { multerImage } from "../multerMiddleware";
import { checkUser, checkViewUser } from "../jwtMiddleware";
import {
  uploadPiece,
  searchProduct,
  uploadMaterial,
  searchMaterial,
  getProductDetail,
  getMaterialDetail,
} from "../controllers/shopController";
const shopRouter = express.Router();

shopRouter.post("/upload/piece", checkUser, uploadPiece);
shopRouter.post(
  "/upload/piece",
  checkUser,
  multerImage.array("img", 3),
  uploadMaterial
);
shopRouter.post(
  "/upload/material",
  checkUser,
  multerImage.array("img", 3),
  uploadMaterial
);
shopRouter.post("/detail/product/:id", getProductDetail);
shopRouter.get("/detail/product/:id", getProductDetail);
shopRouter.post("/detail/material/:id", checkViewUser, getMaterialDetail);
shopRouter.get("/detail/material/:id", checkViewUser, getMaterialDetail);
shopRouter.post("/search/product", searchProduct);
shopRouter.post("/search/material", searchMaterial);

export default shopRouter;
