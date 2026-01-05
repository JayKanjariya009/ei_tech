import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from "../models/teamModel.js";
import { deleteFile } from "../utils/fileUtils.js";

export const getTeamMembers = async (req, res) => {
  try {
    const team = await getAllTeamMembers();
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTeamMember = async (req, res) => {
  try {
    const member = await getTeamMemberById(req.params.id);
    if (!member) return res.status(404).json({ message: "Team member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addTeamMember = async (req, res) => {
  try {
    const { name, position, links, status } = req.body;
    
    const image = req.file ? {
      filename: req.file.filename,
      path: req.file.path,
      url: `/uploads/team/${req.file.filename}`
    } : null;

    let parsedLinks = {};
    if (links) {
      try {
        parsedLinks = JSON.parse(links);
      } catch (e) {
        return res.status(400).json({ message: "Invalid JSON format in links field" });
      }
    }

    const id = await createTeamMember({ name, position, image, links: parsedLinks, status });
    res.status(201).json({ message: "Team member added successfully", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editTeamMember = async (req, res) => {
  try {
    const { name, position, links, status } = req.body;
    const updateData = { name, position, status };

    // Get existing team member
    const existing = await getTeamMemberById(req.params.id);

    if (req.body.removeImage === 'true') {
      // Remove existing image
      if (existing && existing.image && existing.image.filename) {
        deleteFile(existing.image.filename, "team");
      }
      updateData.image = null;
    } else if (req.file) {
      // Replace with new image
      if (existing && existing.image && existing.image.filename) {
        deleteFile(existing.image.filename, "team");
      }
      updateData.image = {
        filename: req.file.filename,
        path: req.file.path,
        url: `/uploads/team/${req.file.filename}`
      };
    }

    if (links) {
      try {
        updateData.links = JSON.parse(links);
      } catch (e) {
        return res.status(400).json({ message: "Invalid JSON format in links field" });
      }
    }

    // Remove control flags from updateData
    delete updateData.removeImage;

    await updateTeamMember(req.params.id, updateData);
    res.json({ message: "Team member updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeTeamMember = async (req, res) => {
  try {
    // Delete associated image
    const existing = await getTeamMemberById(req.params.id);
    if (existing && existing.image && existing.image.filename) {
      deleteFile(existing.image.filename, "team");
    }
    
    await deleteTeamMember(req.params.id);
    res.json({ message: "Team member deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};