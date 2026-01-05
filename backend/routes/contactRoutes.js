import express from "express";
import {
  sendContactMessage,
  getContactMessages,
  getSingleContactMessage,
  subscribeNewsletter,
} from "../controllers/contactController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", sendContactMessage);
router.post("/newsletter", subscribeNewsletter);
router.get("/", authMiddleware, getContactMessages);
router.get("/:id", authMiddleware, getSingleContactMessage);

export default router;
