import express from "express";

import { multerImage } from "../multerMiddleware";
import { checkUser } from "../jwtMiddleware";
import {
  uploadPiece,
  searchProduct,
  uploadMaterial,
} from "../controllers/shopController";
const shopRouter = express.Router();

shopRouter.post("/upload/piece", checkUser, uploadPiece);
shopRouter.post(
  "/upload/piece",
  checkUser,
  multerImage.array("img", 3),
  uploadMaterial
);
shopRouter.post("/upload/material", checkUser, uploadMaterial);
shopRouter.post("/search/piece", searchProduct);

export default shopRouter;
