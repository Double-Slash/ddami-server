import express from "express";

import { multerImage } from "../multerMiddleware";
import { checkUser } from "../jwtMiddleware";
import { uploadPiece } from "../controllers/shopController";
const shopRouter = express.Router();

shopRouter.post("/upload/piece", checkUser, uploadPiece);
shopRouter.post("/upload/material", checkUser);

export default shopRouter;
