import express from "express";

const router = express.Router();

import { rooms } from "../data";

router.get("/list", function (req: express.Request, res: express.Response) {
  res.status(200).json(rooms);
});

// API run successfully without name input??
router.post("/create", function (req: express.Request, res: express.Response) {
  let max_id = 0;
  for (let room of rooms) if (max_id < room.id) max_id = room.id;
  const room = {
    id: max_id + 1,
    name: req.body.name
  };
  rooms.push(room);
  res.status(200).json(rooms);
});

router.post("/delete", function (req: express.Request, res: express.Response) {
  let room_found = false;
  let idx_to_delete = 0;
  const id = parseInt(req.body.id);

  for (let idx = 0; idx < rooms.length; ++idx) {
    if (rooms[idx].id === id) {
      idx_to_delete = idx;
      room_found = true;
      break;
    }
  }
  if (!room_found)
    return res.status(200).send(JSON.stringify("Invalid request"));
  rooms.splice(idx_to_delete, 1);
  console.log(rooms);
  return res.status(200).send("room deleted");
});

export const roomRouter = router;
