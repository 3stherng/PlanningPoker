import express from "express";

const router = express.Router();

import { users } from "../data";

router.get("/list", function (req: express.Request, res: express.Response) {
  res.status(200).json(users);
});

router.post(
  "/get_user_name_with_id",
  function (req: express.Request, res: express.Response) {
    if (!req.body.id) {
      return res.status(400).json({ error: "id required" });
    }
    for (let user of users) {
      if (user.id === req.body.id) {
        res.status(200).json(user.name);
      }
    }
  }
);

// API run successfully without name input??
router.post(
  "/register",
  function (req: express.Request, res: express.Response) {
    let max_id = 0;
    if (!req.body.name) {
      res.status(400).send("name required");
      return;
    }
    for (let user of users) if (max_id < user.id) max_id = user.id;
    const user = {
      id: max_id + 1,
      name: req.body.name,
      is_moderator: false,
    };
    console.log(user);
    users.push(user);
    res.status(200).send("User registered");
  }
);

router.post(
  "/moderator",
  function (req: express.Request, res: express.Response) {
    let user_found = false;
    for (let current_user of users) {
      if (current_user.id === parseInt(req.body.id)) {
        current_user.is_moderator = true;
        user_found = true;
      } else {
        current_user.is_moderator = false;
      }
    }
    res.status(200).send(user_found ? "Moderator updated" : "Invalid request");
  }
);

router.post("/delete", function (req: express.Request, res: express.Response) {
  let user_found = false;
  let idx_to_delete = 0;
  const id = parseInt(req.body.id);
  for (let idx = 0; idx < users.length; ++idx) {
    if (users[idx].id === id) {
      idx_to_delete = idx;
      user_found = true;
      break;
    }
  }
  if (!user_found)
    return res.status(200).send(JSON.stringify("Invalid request"));
  users.splice(idx_to_delete, 1);
  return res.status(200).send({ message: "User deleted" });
});

router.post("/update", function (req: express.Request, res: express.Response) {
  let user_found = false;
  for (let current_user of users) {
    if (current_user.id === parseInt(req.body.id)) {
      current_user.name = req.body.new_name;
      user_found = true;
    }
  }
  res.status(200).send(user_found ? "Name updated" : "Invalid request");
});

export const UserRouter = router;
