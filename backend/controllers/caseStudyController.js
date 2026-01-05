import {
  getAllCaseStudies,
  getCaseStudyById,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
} from "../models/caseStudyModel.js";
import { deleteFile } from "../utils/fileUtils.js";

export const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;

    const { data, total } = await getAllCaseStudies(limit, offset);

    res.json({
      success: true,
      data,
      page,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getById = async (req, res) => {
  try {
    const data = await getCaseStudyById(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { title, tag, description, status } = req.body;
    const image = req.file ? req.file.filename : null;

    // console.log('Create Case Study - Body:', req.body);
    // console.log('Create Case Study - File:', req.file);
    // console.log('Create Case Study - Image filename:', image);

    if (!title || !tag || !description) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Title, tag, and description required",
        });
    }

    const id = await createCaseStudy({
      title,
      tag,
      description,
      image,
      status,
    });
    res
      .status(201)
      .json({ success: true, message: "Created successfully", id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { title, tag, description, status } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const existing = await getCaseStudyById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    let imageToUpdate;
    if (req.body.removeImage === 'true') {
      // Remove existing image
      if (existing.image && existing.image.length > 0) {
        deleteFile(existing.image[0], "caseStudies");
      }
      imageToUpdate = null;
    } else if (image) {
      // Replace with new image
      if (existing.image && existing.image.length > 0) {
        deleteFile(existing.image[0], "caseStudies");
      }
      imageToUpdate = image;
    }

    await updateCaseStudy(req.params.id, {
      title,
      tag,
      description,
      image: imageToUpdate,
      status,
    });
    res.json({ success: true, message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const existing = await getCaseStudyById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    // Delete associated image
    if (existing.image && existing.image.length > 0) {
      deleteFile(existing.image[0], "caseStudies");
    }

    await deleteCaseStudy(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
