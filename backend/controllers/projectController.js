import {
  addProject as createProjectModel,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../models/projectModel.js";

export const addProject = async (req, res) => {
  try {
    const id = await createProjectModel(req.body);
    res.status(201).json({ message: "Project added", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const data = await getAllProjects();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSingleProject = async (req, res) => {
  try {
    const data = await getProjectById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editProject = async (req, res) => {
  try {
    await updateProject(req.params.id, req.body);
    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeProject = async (req, res) => {
  try {
    await deleteProject(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
