import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { jwtMiddleware } from "./jwtMiddleware";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import pieceRouter from "./routers/pieceRouter";
import shopRouter from "./routers/shopRouter";
dotenv.config();

const app = express();

app.use(helmet());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use("/uploads", express.static("./uploads/images/"));
app.set("/", path.join(__dirname, "/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.set("jwt-secret", process.env.SECRET);

app.use(jwtMiddleware);
app.use("/user", userRouter);
app.use("/api", apiRouter);
app.use("/piece", pieceRouter);
app.use("/shop", shopRouter);
export default app;
