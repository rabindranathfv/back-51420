import express from "express";
import cors from "cors";
import displayRoutes from "express-routemap";
import mongoose from "mongoose";

import PlayersRoutes from "./routes/players.routes.js";
import __dirname from "./utils/utils.js";

const PORT = process.env.PORT || 8080;
const DB_HOST = "localhost";
const DB_PORT = 27017;
const DB_NAME = "mongoDBPlayers";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/static", express.static(`${__dirname}/public`));

const MONGO_URL =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URL
    : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const connection = mongoose
  .connect(MONGO_URL)
  .then((conn) => {
    console.log(
      `🚀 ~ file: app.js:18 ~ CONECT WITH MONGO URL: ${MONGO_URL.slice(
        0,
        14
      )} ****`
    );
  })
  .catch((err) => {
    console.log("🚀 ~ file: app.js:23 ~ connection ~ err:", err);
  });

app.use("/api/alive", (req, res) => {
  res.json({ ok: true, message: "API ALIVE AND RUNING" });
});

app.use("/api/players", PlayersRoutes);

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`***** ENVIROMENT, ${PORT} ${process.env.NODE_ENV} ******`);
});
