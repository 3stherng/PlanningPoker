import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { UserRouter } from "./user/user.router";
import { StoryRouter } from "./story/story.router";
import { SizeRouter } from "./size/size.router";

const app = express();
require("dotenv").config();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

const Logger = function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log("--------------------------");
  console.log(`Hit ENDPOINT: ${req.url}`);
  if (req.body) console.log(`REQ BODY: ${JSON.stringify(req.body)}`);
  if (req.params) console.log(`REQ PARAMS: ${JSON.stringify(req.params)}`);
  console.log("--------------------------");
  next();
};
app.use(Logger);

app.use("/user", UserRouter);
app.use("/story", StoryRouter);
app.use("/size", SizeRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

export default app;
