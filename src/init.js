import "./db";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const handleListening = () => console.log(`Server run`);

app.listen(process.env.PORT || 5800, handleListening);
