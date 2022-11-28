import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyParser.json());

import mongoose from "mongoose";
mongoose.connect(process.env.DATABASE_URL); //,{useNewUrlParser:true})
const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("connected to mongo DB");
});

app.use("/public", express.static("public"));

import authRouter from "../src/routes/auth_route";
app.use("/auth", authRouter);

import postRouter from "../src/routes/post_route";
app.use("/post", postRouter);

export = app;
