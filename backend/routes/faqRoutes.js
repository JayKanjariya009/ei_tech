import express from "express";
import {
  getFaqs,
  createFaq,
  getFaq,
  updateFaqById,
  deleteFaqById,
} from "../controllers/faqsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getFaqs);
router.post("/", authMiddleware, createFaq);
router.get("/:id", getFaq);
router.put("/:id", authMiddleware, updateFaqById);
router.delete("/:id", authMiddleware, deleteFaqById);

export default router;
