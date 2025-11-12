import express from "express";
import cors from "cors";
const bodyParser = require("body-parser"); 

import { UserRouter } from "./src/user/user.router";
import { StoryRouter } from "./src/story/story.router";
import { SizeRouter } from "./src/size/size.router";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
const Logger = function (req, res, next) {
  console.log(`--------------------------`);
  console.log(`Hit ENDPOINT: ${req.url}`);
  if (req.body) console.log(`REQ BODY: ${JSON.stringify(req.body)}`);
  if (req.params) console.log(`REQ PARAMS: ${JSON.stringify(req.params)}`);
  console.log(`--------------------------`);
  next();
};
app.use(Logger);

app.use("/user", UserRouter);
app.use("/story", StoryRouter);
app.use("/size", SizeRouter);

app.listen(port, () => {
  console.log("Server running...");
});

console.log("I dont know lizards cant grow from tail, tell me im stupid");
