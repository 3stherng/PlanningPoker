import express from "express";
import {
  listRooms,
  createRoom,
  deleteRoom,
  setStory,
  getActiveStory,
} from "../controllers/room.controller";

const router = express.Router();

router.get("/list", listRooms);
router.post("/create", createRoom);
router.post("/delete", deleteRoom);
router.post("/set_story", setStory);
router.get("/:room_id/active_story", getActiveStory);

export const roomRouter = router;
