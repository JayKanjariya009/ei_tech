import express from "express";
import {
  addProject,
  getProjects,
  getSingleProject,
  editProject,
  removeProject
} from "../controllers/projectController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addProject);
router.get("/", getProjects);
router.get("/:id", getSingleProject);
router.put("/:id", authMiddleware, editProject);
router.delete("/:id", authMiddleware, removeProject);

export default router;
