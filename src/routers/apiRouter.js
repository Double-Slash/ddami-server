import express from "express";
import { postSearch, getSearch } from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.post("/search", postSearch);
apiRouter.get("/search", getSearch);

export default apiRouter;
