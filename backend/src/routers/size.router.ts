import express from "express";
import {
  getActiveStories,
  getAllVotes,
  submitVote,
  setTimer,
  submitFinalSize,
  revote,
} from "../controllers/vote.controller";

const router = express.Router();

router.get("/activestory", getActiveStories);
router.post("/allvotes", getAllVotes);
router.post("/voting", submitVote);
router.post("/timer", setTimer);
router.post("/submit", submitFinalSize);
router.post("/revote", revote);

export const SizeRouter = router;
