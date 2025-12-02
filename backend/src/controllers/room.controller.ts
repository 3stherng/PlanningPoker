import { Request, Response } from "express";
import { rooms } from "../data";
import { Room } from "../models/room.models";
import { generateId } from "../utils/idGenerator";

export const listRooms = (req: Request, res: Response) => {
  return res.status(200).json(rooms);
};

export const createRoom = (
  req: Request<{}, {}, { name: string }>,
  res: Response
) => {
  const { name } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({ error: "Room name is required" });
  }

  const room: Room = {
    id: generateId("r"),
    name,
    story_id: null,
  };

  rooms.push(room);
  res.status(201).json(room);
};

export const deleteRoom = (
  req: Request<{}, {}, { id: string }>,
  res: Response
) => {
  const id = req.body.id;
  const idx = rooms.findIndex((r) => r.id === id);

  if (idx === -1) {
    return res.status(404).json({ error: "Room not found" });
  }

  rooms.splice(idx, 1);
  res.status(200).json({ message: "Room deleted" });
};

export const setStory = (
  req: Request<{}, {}, { room_id: string; story_id: string }>,
  res: Response
) => {
  const { room_id, story_id } = req.body;

  if (!room_id || story_id === undefined) {
    return res.status(400).json({ error: "room_id and story_id are required" });
  }

  const room = rooms.find((r) => r.id === room_id);

  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  room.story_id = story_id;
  res.status(200).json({ story_id });
};

export const getActiveStory = (
  req: Request<{ room_id: string }>,
  res: Response
) => {
  const room_id = req.params.room_id;

  const room = rooms.find((r) => r.id === room_id);

  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  res.status(200).json({ story_id: room.story_id });
};
