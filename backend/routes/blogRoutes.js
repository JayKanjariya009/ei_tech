import express from "express";
import {
  addBlog,
  getBlogs,
  getSingleBlog,
  editBlog,
  removeBlog,
  addComment,
  getBlogComments,
  removeComment,
  addReply,
  removeReply
} from "../controllers/blogController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { createUploader } from "../middleware/upload.js";

const router = express.Router();

const blogUploader = createUploader("blogImages").fields([
  { name: "images", maxCount: 10 }
]);

// Blog routes
router.post("/", authMiddleware, blogUploader, addBlog);
router.get("/", getBlogs);
router.get("/:id", getSingleBlog);
router.put("/:id", authMiddleware, blogUploader, editBlog);
router.delete("/:id", authMiddleware, removeBlog);

// Comment routes
router.post("/:blogId/comments", addComment);
router.get("/:blogId/comments", getBlogComments);
router.delete("/comments/:commentId", authMiddleware, removeComment);

// Reply routes
router.post("/comments/:commentId/replies", addReply);
router.delete("/replies/:replyId", authMiddleware, removeReply);

export default router;