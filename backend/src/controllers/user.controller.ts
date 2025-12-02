import { Request, Response } from "express";
import { users, active_users } from "../data";
import { User, ActiveUser } from "../models/user.models";
import { generateId } from "../utils/idGenerator";

export const listUsers = (req: Request, res: Response) => {
  res.status(200).json(users);
};

export const getUserNameById = (
  req: Request<{}, {}, { id: string }>,
  res: Response
) => {
  if (!req.body.id) {
    return res.status(400).json({ error: "id required" });
  }

  const id = req.body.id;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user.name);
};

export const registerUser = (
  req: Request<{}, {}, { name: string }>,
  res: Response
) => {
  const { name } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({ error: "name required" });
  }

  // Check if user already exists
  const existingUser = users.find((u) => u.name === name);
  if (existingUser) {
    return res
      .status(200)
      .json({ message: "skipped registration", user: existingUser });
  }

  const user: User = {
    id: generateId(),
    name,
    is_moderator: false,
  };

  users.push(user);
  res.status(201).json(user);
};

export const setModerator = (
  req: Request<{}, {}, { id: string }>,
  res: Response
) => {
  const id = req.body.id;
  let user_found = false;

  users.forEach((user) => {
    if (user.id === id) {
      user.is_moderator = true;
      user_found = true;
    } else {
      user.is_moderator = false;
    }
  });

  res
    .status(200)
    .json({ message: user_found ? "Moderator updated" : "Invalid request" });
};

export const deleteUser = (
  req: Request<{}, {}, { id: string }>,
  res: Response
) => {
  const id = req.body.id;
  const idx = users.findIndex((u) => u.id === id);

  if (idx === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(idx, 1);
  res.status(200).json({ message: "User deleted" });
};

export const updateUser = (
  req: Request<{}, {}, { id: string; new_name: string }>,
  res: Response
) => {
  const id = req.body.id;
  const { new_name } = req.body;

  if (!new_name?.trim()) {
    return res.status(400).json({ error: "new_name required" });
  }

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.name = new_name;
  res.status(200).json({ message: "Name updated", user });
};

export const vote = (
  req: Request<{}, {}, { room_id: string; user_id: string; size: number }>,
  res: Response
) => {
  const room_id = req.body.room_id;
  const user_id = req.body.user_id;
  const size = req.body.size;

  const active_user = active_users.find(
    (au) => au.room_id === room_id && au.user_id === user_id
  );

  if (!active_user) {
    return res.status(404).json({ error: "Active user not found in room" });
  }

  active_user.size = size;
  res.status(200).json({ message: "Vote recorded", vote: active_user });
};

export const getActiveUsers = (
  req: Request<{}, {}, { room_id: string }>,
  res: Response
) => {
  const room_id = req.body.room_id;

  const result_users = active_users
    .filter((au) => au.room_id === room_id)
    .map((au) => users.find((u) => u.id === au.user_id))
    .filter((u): u is User => u !== undefined);

  res.status(200).json(result_users);
};

export const addActiveUser = (
  req: Request<{}, {}, { room_id: string; user_id: string }>,
  res: Response
) => {
  const room_id = req.body.room_id;
  const user_id = req.body.user_id;

  const already_active = active_users.some(
    (au) => au.room_id === room_id && au.user_id === user_id
  );

  if (!already_active) {
    const new_active_user: ActiveUser = { room_id, user_id, size: 0 };
    active_users.push(new_active_user);
  }

  res.status(200).json(active_users);
};

export const removeActiveUser = (
  req: Request<{}, {}, { user_id: string }>,
  res: Response
) => {
  const user_id = req.body.user_id;
  const idx = active_users.findIndex((au) => au.user_id === user_id);

  if (idx !== -1) {
    active_users.splice(idx, 1);
  }

  res.status(200).json(active_users);
};

export const getVotes = (
  req: Request<{}, {}, { room_id: string }>,
  res: Response
) => {
  const room_id = req.body.room_id;

  const result_votes = active_users
    .filter((au) => au.room_id === room_id)
    .map((au) => ({
      user_id: au.user_id,
      size: au.size,
    }));

  res.status(200).json(result_votes);
};

export const getAverageVote = (
  req: Request<{}, {}, { room_id: string }>,
  res: Response
) => {
  const room_id = req.body.room_id;

  const votes = active_users.filter(
    (au) => au.room_id === room_id && au.size !== null && au.size !== 0
  );

  if (votes.length === 0) {
    return res.status(200).json(null);
  }

  const total_size = votes.reduce((sum, au) => sum + au.size, 0);
  const average_size = total_size / votes.length;

  res.status(200).json(average_size);
};
