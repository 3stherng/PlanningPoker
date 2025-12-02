import { Request, Response } from "express";
import { stories } from "../data";
import { Story } from "../models/story.models";
import { generateId } from "../utils/idGenerator";

export const listStories = (req: Request, res: Response) => {
  return res.status(200).json(stories);
};

export const addStory = (
  req: Request<{}, {}, { title: string }>,
  res: Response
) => {
  const { title } = req.body;

  if (!title?.trim()) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const story: Story = { id: generateId("s"), title, size: null };

  stories.push(story);
  res.status(201).json(story);
};

export const updateStory = (
  req: Request<{ id: string }, {}, { id: string; title: string }>,
  res: Response
) => {
  let story_found = false;
  let title_reset = false;
  for (let current_story of stories) {
    if (current_story.id === req.body.id) {
      current_story.title = req.body.title;
      title_reset = true;
      story_found = true;
      res.status(200).json(current_story.title);
    }
    // if (JSON.parse(req.body.reset_active.toLowerCase()) === true) {
    //   current_story.size = null;
    // }
  }
};

export const deleteStory = (req: Request<{ id: string }>, res: Response) => {
  console.log("Delete story called with id:", req.params.id);
  const id = req.params.id;
  const idx = stories.findIndex((s) => s.id === id);

  if (idx === -1) {
    return res.status(404).json({ error: "Story not found" });
  }

  stories.splice(idx, 1);
  res.status(200).json({ message: "Story deleted" });
};
