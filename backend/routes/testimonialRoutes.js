import express from "express";
import {
  addTestimonial,
  getTestimonials,
  getAllTestimonialsAdmin,
  getSingleTestimonial,
  editTestimonial,
  approveTestimonialController,
  removeTestimonial
} from "../controllers/testimonialController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { createUploader } from "../middleware/upload.js";

const testimonialUpload = createUploader("testimonials");

const router = express.Router();

router.post("/", authMiddleware, testimonialUpload.array("image", 5), addTestimonial);
router.get("/", getTestimonials);
router.get("/admin/all", authMiddleware, getAllTestimonialsAdmin);
router.get("/:id", getSingleTestimonial);
router.put("/:id", authMiddleware, testimonialUpload.array("image", 5), editTestimonial);
router.put("/:id/approve", authMiddleware, approveTestimonialController);
router.delete("/:id", authMiddleware, removeTestimonial);

export default router;
