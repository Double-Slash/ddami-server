import express from "express";
import { postSearch } from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.post("/search", postSearch);
export default apiRouter;
