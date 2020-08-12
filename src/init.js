import "./db";
import app from "./app";
import dotenv from "dotenv";
import { sendMessage } from "./pushAlarm";
dotenv.config();

const handleListening = () => console.log(`Server run`);
sendMessage(
  "cgPpsM46Qwg:APA91bGrtWIpHDV3Z4S0Otqk4QMeKRcRQvxtxEjcpXpRe0BqmR73c4emamwbtNIkSy861fHRGGsdTYb0oEQFA4K25g8yKhyUUfqFkoRWf5hBx9WSb3t1kN2-j0wHAObHTGXffkgbs8PS",
  "진희님",
  "안녕"
);
app.listen(process.env.PORT || 5800, handleListening);
