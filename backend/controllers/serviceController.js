import {
  addService as createServiceModel,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../models/serviceModel.js";
import { deleteFiles, deleteFile } from "../utils/fileUtils.js";
import pool from "../config/db.js";

export const addService = async (req, res) => {
  try {
    let icon = null;
    let images = [];

    // Single icon upload (req.files.icon)
    if (req.files && req.files.icon && req.files.icon[0]) {
      icon = req.files.icon[0].filename;
    }

    // Multiple images upload (req.files.images)
    if (req.files && req.files.images) {
      images = req.files.images.map((file) => file.filename);
    }

    // Convert features string → JSON array
    let features = [];
    if (req.body.features) {
      try {
        features = JSON.parse(req.body.features);
      } catch (err) {
        features = [];
      }
    }

    const newService = {
      title: req.body.title,
      description: req.body.description,
      icon,
      images,
      features,
    };

    const id = await createServiceModel(newService);

    res.status(201).json({ message: "Service created", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const data = await getAllServices(page, limit);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getSingleService = async (req, res) => {
  try {
    const data = await getServiceById(req.params.id);

    if (!data) return res.status(404).json({ message: "Not found" });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const editService = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // Parse stringified JSON if needed
    if (req.body.features) {
      try {
        updateData.features = JSON.parse(req.body.features);
      } catch (err) {
        updateData.features = [];
      }
    }

    // Get existing service for image cleanup (get raw data from DB)
    const sql = `SELECT * FROM services WHERE id = ?`;
    const [rows] = await pool.query(sql, [req.params.id]);
    const existing = rows[0] || null;

    // Handle icon removal/update
    if (req.body.removeIcon === 'true') {
      if (existing && existing.icon) {
        deleteFile(existing.icon, "serviceIcons");
      }
      updateData.icon = null;
    } else if (req.files && req.files.icon && req.files.icon[0]) {
      if (existing && existing.icon) {
        deleteFile(existing.icon, "serviceIcons");
      }
      updateData.icon = req.files.icon[0].filename;
    }

    // Handle images removal/update
    if (req.body.removeImages === 'true') {
      if (existing && existing.images) {
        try {
          const imageArray = JSON.parse(existing.images || '[]');
          deleteFiles(imageArray, "serviceImages");
        } catch (parseError) {
          console.error('Error parsing existing images:', parseError);
        }
      }
      updateData.images = [];
    } else if (req.files && req.files.images) {
      if (existing && existing.images) {
        try {
          const imageArray = JSON.parse(existing.images || '[]');
          deleteFiles(imageArray, "serviceImages");
        } catch (parseError) {
          console.error('Error parsing existing images:', parseError);
        }
      }
      updateData.images = req.files.images.map((file) => file.filename);
    }

    // Remove control flags from updateData
    delete updateData.removeIcon;
    delete updateData.removeImages;

    await updateService(req.params.id, updateData);

    res.json({ message: "Updated successfully" });
  } catch (err) {
    console.error('Error in editService:', err);
    res.status(500).json({ message: err.message });
  }
};


export const removeService = async (req, res) => {
  try {
    // Get raw database data for file deletion
    const sql = `SELECT * FROM services WHERE id = ?`;
    const [rows] = await pool.query(sql, [req.params.id]);
    const existing = rows[0] || null;
    
    if (existing) {
      if (existing.icon) {
        deleteFile(existing.icon, "serviceIcons");  
      }
      if (existing.images) {
        try {
          const imageArray = JSON.parse(existing.images || '[]');
          deleteFiles(imageArray, "serviceImages");
        } catch (parseError) {
          console.error('Error parsing images JSON:', parseError, existing.images);
        }
      }
    }
    
    await deleteService(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error('Error in removeService:', err);
    res.status(500).json({ message: err.message });
  }
};
