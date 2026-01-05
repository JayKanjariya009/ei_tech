import express from "express";
import {
  getUsers,
  getProfile,
  updateProfile,
  getSingleUser,
  editUser,
  updatePassword,
  removeUser,
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected (only logged-in users)
// You can add role check later if you want admin-only

router.get("/", authMiddleware, getUsers);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.get("/:id", authMiddleware, getSingleUser);
router.put("/:id", authMiddleware, editUser);
router.put("/:id/password", authMiddleware, updatePassword);
router.delete("/:id", authMiddleware, removeUser);

export default router;
