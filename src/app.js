import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { jwtMiddleware } from "./jwtMiddleware";

dotenv.config();

const app = express();

app.use(helmet());
app.set("/", path.join(__dirname, "/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.set("jwt-secret", process.env.SECRET);

app.use(jwtMiddleware);
app.use("/", (req, res) => res.send("DDAMI_SERVER"));

export default app;
