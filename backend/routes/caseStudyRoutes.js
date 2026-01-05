import express from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove
} from "../controllers/caseStudyController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { createUploader } from "../middleware/upload.js";

const router = express.Router();
const caseStudyUploader = createUploader("caseStudies");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", authMiddleware, caseStudyUploader.single("image"), create);
router.put("/:id", authMiddleware, caseStudyUploader.single("image"), update);
router.delete("/:id", authMiddleware, remove);

export default router;
