import express from "express";
import {
  listStories,
  addStory,
  updateStory,
  deleteStory,
} from "../controllers/story.controller";

const router = express.Router();

router.get("/list", listStories);
router.post("/add", addStory);
router.post("/update", updateStory);
router.delete("/delete/:id", deleteStory);

export const StoryRouter = router;
