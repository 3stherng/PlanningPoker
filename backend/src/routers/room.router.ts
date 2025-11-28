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
    name: req.body.name,
    story_id: null,
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

router.post("/set_story", (req, res) => {
  const { room_id, story_id } = req.body;
  const room = rooms.find(r => r.id === room_id);
  if (!room) return res.status(404).send("Room not found");

  room.story_id = story_id;
  res.status(200).send({ story_id: story_id });
});

// GET: fetch active story for a room
router.get("/:room_id/active_story", (req, res) => {
  const room_id = parseInt(req.params.room_id);
  const room = rooms.find(r => r.id === room_id);
  if (!room) return res.status(404).send("Room not found");

  res.status(200).send({ story_id: room.story_id });
});

export const roomRouter = router;
