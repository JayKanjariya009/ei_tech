import express from "express";
import {
  getTeamMembers,
  getTeamMember,
  addTeamMember,
  editTeamMember,
  removeTeamMember
} from "../controllers/teamController.js";
import { createUploader } from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = createUploader("team");

router.get("/", getTeamMembers);
router.get("/:id", getTeamMember);
router.post("/", authMiddleware, upload.single("image"), addTeamMember);
router.put("/:id", authMiddleware, upload.single("image"), editTeamMember);
router.delete("/:id", authMiddleware, removeTeamMember);

export default router;