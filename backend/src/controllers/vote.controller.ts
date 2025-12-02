import { Request, Response } from "express";
import { stories, votes, timers, users } from "../data";
import { Vote } from "../models/vote.models";

export const getActiveStories = (req: Request, res: Response) => {
  const active_stories = stories.filter((story) => story.size === null);
  res.status(200).json(active_stories);
};

export const getAllVotes = (
  req: Request<{}, {}, { story_id: string }>,
  res: Response
) => {
  const story_id = req.body.story_id;
  const users_size = votes
    .filter((vote) => vote.story_id === story_id)
    .map((vote) => ({
      story_id: vote.story_id,
      user: vote.user_id,
      size: vote.size,
    }));

  res.status(200).json(users_size);
};

export const submitVote = (
  req: Request<{}, {}, { story_id: string; user_id: string; size: number }>,
  res: Response
) => {
  const story_id = req.body.story_id;
  const user_id = req.body.user_id;
  const size = req.body.size;

  // Validate story exists and is not yet sized
  const story = stories.find((s) => s.id === story_id && s.size === null);
  if (!story) {
    return res.status(400).json({ error: "Story not found or already sized" });
  }

  // Validate user exists
  const user = users.find((u) => u.id === user_id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const vote: Vote = { story_id, user_id, size };
  votes.push(vote);

  res.status(201).json(vote);
};

export const setTimer = (
  req: Request<{}, {}, { story_id: string; timer: number | null }>,
  res: Response
) => {
  const story_id = req.body.story_id;
  const timer = req.body.timer;

  const existingTimer = timers.find((t) => t.story_id === story_id);

  if (existingTimer) {
    existingTimer.timer = timer;
    res.status(200).json({ message: "Timer set", timer });
  } else {
    return res.status(404).json({ error: "Story not found" });
  }
};

export const submitFinalSize = (
  req: Request<{}, {}, { story_id: string }>,
  res: Response
) => {
  const story_id = req.body.story_id;
  const story = stories.find((s) => s.id === story_id);

  if (!story) {
    return res.status(404).json({ error: "Story not found" });
  }

  const storyVotes = votes.filter((v) => v.story_id === story_id);

  if (storyVotes.length === 0) {
    return res.status(400).json({ error: "No votes found for this story" });
  }

  const total_size = storyVotes.reduce((sum, vote) => sum + vote.size, 0);
  const average_size = Math.round(total_size / storyVotes.length);

  story.size = average_size;

  res.status(200).json({ size: average_size });
};

export const revote = (
  req: Request<{}, {}, { story_id: string }>,
  res: Response
) => {
  const story_id = req.body.story_id;
  const story = stories.find((s) => s.id === story_id);

  if (!story) {
    return res.status(404).json({ error: "Story not found" });
  }

  // Reset all votes for this story to 0
  votes.forEach((vote) => {
    if (vote.story_id === story_id) {
      vote.size = 0;
    }
  });

  res.status(200).json({ message: "Votes reset for revoting" });
};
