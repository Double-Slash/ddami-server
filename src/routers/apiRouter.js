import express from "express";
import {
  postSearch,
  getSearch,
  getAuthorSearch,
  postAuthorSearch,
} from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.get("/author/search", getAuthorSearch);
apiRouter.post("/author/search", postAuthorSearch);
apiRouter.post("/search", postSearch);
apiRouter.get("/search", getSearch);

export default apiRouter;
