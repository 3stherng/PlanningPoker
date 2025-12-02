import express from "express";
import {
  listUsers,
  getUserNameById,
  registerUser,
  setModerator,
  deleteUser,
  updateUser,
  vote,
  getActiveUsers,
  addActiveUser,
  removeActiveUser,
  getVotes,
  getAverageVote,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/list", listUsers);
router.post("/get_user_name_with_id", getUserNameById);
router.post("/register", registerUser);
router.post("/moderator", setModerator);
router.post("/delete", deleteUser);
router.post("/update", updateUser);
router.post("/vote", vote);
router.post("/active_users", getActiveUsers);
router.post("/add_active_user", addActiveUser);
router.post("/remove_active_user", removeActiveUser);
router.post("/get_votes", getVotes);
router.post("/get_average_vote", getAverageVote);

export const UserRouter = router;
