import express from "express";
import { getPieceDetail } from "../controllers/pieceController";
import { checkViewUser } from "../jwtMiddleware";

const pieceRouter = express.Router();

pieceRouter.get("/detail/:id", checkViewUser, getPieceDetail);
pieceRouter.post("/detail/:id", checkViewUser, getPieceDetail);
export default pieceRouter;
