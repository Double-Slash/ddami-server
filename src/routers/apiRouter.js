import express from "express";
import {
  postSearch,
  getSearch,
  getAuthorSearch,
  postAuthorSearch,
  postSearchHistory,
  dbCollectionDrop,
} from "../controllers/apiController";
import { checkUser } from "../jwtMiddleware";
const apiRouter = express.Router();

apiRouter.get("/author/search", getAuthorSearch);
apiRouter.post("/author/search", postAuthorSearch);
apiRouter.post("/search", postSearch);
apiRouter.get("/search", getSearch);
apiRouter.post("/search/history", checkUser, postSearchHistory);
apiRouter.get("/util/db/set", dbCollectionDrop);
apiRouter.post("/util/db/set", dbCollectionDrop);
export default apiRouter;
