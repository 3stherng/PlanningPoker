import express from "express";

const router = express.Router();

import { users, active_users } from "../data";

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
    for (let user of users) {
      if (req.body.name === user.name) {
        res.status(200).send("skipped registration");
        return;
      }
      if (max_id < user.id) max_id = user.id;
    }
    const user = {
      id: max_id + 1,
      name: req.body.name,
      is_moderator: false,
    };
    console.log(user);
    users.push(user);
    res.status(200).json(users);
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
    res.status(200).json(user_found ? "Moderator updated" : "Invalid request");
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

router.post("/vote", function (req: express.Request, res: express.Response) {
// it will update the active_users to store the vote size
  let user_found = false;
  for (let active_user of active_users) {
    if (
      active_user.room_id === parseInt(req.body.room_id) &&
      active_user.user_id === parseInt(req.body.user_id)
    ) {
      active_user.size = parseInt(req.body.size);
      user_found = true;
      break;
    }
  }
  res.status(200).json(user_found ? "Vote recorded" : "Invalid request");
});


router.post(
  "/active_users",
  function (req: express.Request, res: express.Response) {
    const room_id = parseInt(req.body.room_id);
    let result_users = [];
    for (let active_user of active_users) {
      if (active_user.room_id === room_id) {
        for (let user of users) {
          if (user.id === active_user.user_id) {
            result_users.push(user);
          }
        }
      }
    }
    res.status(200).json(result_users);
  }
);

router.post(
  "/add_active_user",
  function (req: express.Request, res: express.Response) {
    const room_id = parseInt(req.body.room_id);
    const user_id = parseInt(req.body.user_id);
    let already_active = false;
    for (let active_user of active_users) {
      if (active_user.room_id === room_id && active_user.user_id === user_id) {
        already_active = true;
        break;
      }
    }
    if (!already_active) {
      active_users.push({ room_id: room_id, user_id: user_id, size: 0 });
    }
    res.status(200).json(active_users);
  }
)

router.post("/get_votes", function (req: express.Request, res: express.Response) {
  const room_id = parseInt(req.body.room_id);
  let result_votes = [];
  for (let active_user of active_users) {
    if (active_user.room_id === room_id) {
      result_votes.push({
        user_id: active_user.user_id,
        size: active_user.size,
      });
    }
  }
  res.status(200).json(result_votes);
});

router.post(
  "/get_average_vote",
  function (req: express.Request, res: express.Response) {
    const room_id = parseInt(req.body.room_id);
    let total_size = 0;
    let vote_count = 0;
    for (let active_user of active_users) {
      if (active_user.room_id === room_id && active_user.size !== null) {
        total_size += active_user.size;
        vote_count += 1;
      }
    }
    if (vote_count === 0) {
      return res.status(200).json(null);
    }
    const average_size = total_size / vote_count;
    res.status(200).json(average_size);
  }
);

export const UserRouter = router;
