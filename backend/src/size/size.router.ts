import express from "express";

const router = express.Router();

import { timers, users } from "../data";
import { stories } from "../data";
import { votes } from "../data";

router.get(
  "/activestory",
  function (req: express.Request, res: express.Response) {
    let active_story = [];
    // let completed_story = [];
    for (let current_story of stories) {
      if (current_story.size === null) {
        active_story.push(current_story);
      }
    }
    res.json(active_story);
  }
);

router.post(
  "/allvotes",
  function (req: express.Request, res: express.Response) {
    let story_found = false;
    let users_size = [];
    for (let current_vote of votes) {
      if (current_vote.story_id == parseInt(req.body.story_id)) {
        users_size.push({
          story_id: current_vote.story_id,
          user: current_vote.user_id,
          size: current_vote.size,
        });
        story_found = true;
      }
    }
    res.status(200).json(users_size);
  }
);

// todo: clear vote
router.post("/voting", function (req: express.Request, res: express.Response) {
  let story_found = false;
  let story_not_sized = false;
  let user_found = false;

  const vote = {
    story_id: req.body.story_id,
    user_id: req.body.user_id,
    size: req.body.size,
  };

  for (let current_story of stories) {
    if (
      current_story.id === parseInt(vote.story_id) &&
      current_story.size === null
    ) {
      story_found = true;
      story_not_sized = true;
      for (let current_user of users) {
        if (current_user.id === parseInt(vote.user_id)) {
          user_found = true;
          votes.push(vote);
        }
      }
    }
  }
  res.status(200).json(votes);
});

router.post("/timer", function (req: express.Request, res: express.Response) {
  let story_found = false;
  for (let current_timer of timers) {
    if (current_timer.story_id == parseInt(req.body.story_id)) {
      current_timer.timer = req.body.timer;
      story_found = true;
    }
  }
  res.status(200).send(story_found ? "Timer Set" : "Invalid request");
});

router.post("/submit", function (req: express.Request, res: express.Response) {
  let story_found = false;
  let total_size = 0;
  let no_of_user = 0;
  for (let current_story of stories) {
    if (current_story.id === parseInt(req.body.story_id)) {
      story_found = true;
      for (let current_vote of votes) {
        if (current_vote.story_id === current_story.id) {
          ++no_of_user;
          total_size = total_size + current_vote.size;
        }
      }
      current_story.size = parseInt((total_size / no_of_user).toFixed());
      console.log(current_story.size);
      res.status(200).json(current_story.size);
    }
  }
});

router.post("/revote", function (req: express.Request, res: express.Response) {
  let story_found = false;
  for (let current_story of stories) {
    if (current_story.id === parseInt(req.body.story_id)) {
      story_found = true;
      console.log(current_story.id);
      for (let current_vote of votes) {
        if (current_vote.story_id === current_story.id)
          current_vote.size = null;
      }
      res.status(200).json(stories);
    }
  }
});

export const SizeRouter = router;
