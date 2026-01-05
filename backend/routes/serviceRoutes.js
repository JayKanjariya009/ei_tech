import express from "express";
import {
  addService,
  getServices,
  getSingleService,
  editService,
  removeService
} from "../controllers/serviceController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { createServiceUploader } from "../middleware/upload.js";

const router = express.Router();

// Service uploader with separate folders
const serviceUploader = createServiceUploader();

router.post("/", authMiddleware, serviceUploader, addService);
router.get("/", getServices);
router.get("/:id", getSingleService);
router.put("/:id", authMiddleware, serviceUploader, editService);
router.delete("/:id", authMiddleware, removeService);

export default router;
