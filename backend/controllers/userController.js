import {
  findUserById,
  findUserByEmail,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
} from "../models/userModel.js";

import bcrypt from "bcryptjs";

//  GET ALL USERS (ADMIN ONLY)
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  GET CURRENT USER PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove password from response
    const { password, ...userProfile } = user;
    res.json(userProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  GET SINGLE USER
export const getSingleUser = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  UPDATE CURRENT USER PROFILE
export const updateProfile = async (req, res) => {
  try {
    await updateUser(req.user.id, req.body);
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  UPDATE USER (name, phone, etc)
export const editUser = async (req, res) => {
  try {
    await updateUser(req.params.id, req.body);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//  UPDATE PASSWORD

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await findUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(401).json({ message: "Old password incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);

    await updateUser(req.params.id, { password: hashed });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//  DELETE USER
export const removeUser = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
