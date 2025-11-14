import express from "express";

const router = express.Router();

import { stories } from "../data";

router.get("/list", function (req: express.Request, res: express.Response) {
  res.status(200).json(stories);
});

// API run successfully without title input??
router.post("/add", function (req: express.Request, res: express.Response) {
  let max_id = 0;
  for (let story of stories) if (max_id < story.id) max_id = story.id;
  const story = {
    id: max_id + 1,
    title: req.body.title,
    size: null,
  };
  stories.push(story);
  res.status(200).json(stories);
});

// This API is to reset story status to active and update title?
router.post("/update", function (req: express.Request, res: express.Response) {
  let story_found = false;
  let title_reset = false;
  for (let current_story of stories) {
    if (current_story.id === parseInt(req.body.id)) {
      current_story.title = req.body.title;
      title_reset = true;
      story_found = true;
      res.status(200).json(current_story.title);
    }
    // if (JSON.parse(req.body.reset_active.toLowerCase()) === true) {
    //   current_story.size = null;
    // }
  }
});

router.post("/delete", function (req: express.Request, res: express.Response) {
  let story_found = false;
  let idx_to_delete = 0;
  const id = parseInt(req.body.id);

  for (let idx = 0; idx < stories.length; ++idx) {
    if (stories[idx].id === id) {
      idx_to_delete = idx;
      story_found = true;
      break;
    }
  }
  if (!story_found)
    return res.status(200).send(JSON.stringify("Invalid request"));
  stories.splice(idx_to_delete, 1);
  console.log(stories);
  return res.status(200).send("Story deleted");
});

export const StoryRouter = router;
