import {
  addTestimonial as createTestimonialModel,
  getAllTestimonials,
  getApprovedTestimonials,
  getTestimonialById,
  updateTestimonial,
  approveTestimonial,
  deleteTestimonial,
} from "../models/testimonialModel.js";
import { deleteFiles } from "../utils/fileUtils.js";

export const addTestimonial = async (req, res) => {
  try {
    const { user_name, user_email, message, rating } = req.body;
    const image = req.files ? req.files.map((file) => file.filename) : [];

    if (!user_name || !user_email || !message || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const id = await createTestimonialModel({
      user_name,
      user_email,
      message,
      rating,
      image,
    });
    res.status(201).json({ message: "Testimonial created successfully", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const data = await getApprovedTestimonials();

    const testimonials = data.map((testimonial) => {
      return {
        ...testimonial,
        image: Array.isArray(testimonial.image) ? testimonial.image : [],
      };
    });

    res.json(testimonials);
  } catch (err) {
    console.error("Error in getTestimonials:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getAllTestimonialsAdmin = async (req, res) => {
  try {
    const data = await getAllTestimonials();

    const testimonials = data.map((testimonial) => {
      return {
        ...testimonial,
        image: Array.isArray(testimonial.image) ? testimonial.image : [],
      };
    });

    res.json(testimonials);
  } catch (err) {
    console.error("Error in getAllTestimonialsAdmin:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getSingleTestimonial = async (req, res) => {
  try {
    const data = await getTestimonialById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });

    const testimonial = {
      ...data,
      image: Array.isArray(data.image) ? data.image : [],
    };
    res.json(testimonial);
  } catch (err) {
    console.error("Error in getSingleTestimonial:", err);
    res.status(500).json({ message: err.message });
  }
};

export const editTestimonial = async (req, res) => {
  try {
    const { user_name, user_email, message, rating, status } = req.body;
    const newImages = req.files ? req.files.map((file) => file.filename) : [];

    // Get existing testimonial
    const existing = await getTestimonialById(req.params.id);
    let existingImages = [];

    if (existing && existing.image) {
      existingImages = Array.isArray(existing.image) ? existing.image : [];
    }

    let image;
    if (req.body.removeImages === "true") {
      // Remove all existing images
      if (existingImages.length > 0) {
        deleteFiles(existingImages, "testimonials");
      }
      image = [];
    } else if (newImages.length > 0) {
      // Replace with new images
      if (existingImages.length > 0) {
        deleteFiles(existingImages, "testimonials");
      }
      image = newImages;
    } else {
      // Keep existing images
      image = existingImages;
    }

    const updateData = { user_name, user_email, message, rating, image };
    if (status) updateData.status = status;

    await updateTestimonial(req.params.id, updateData);
    res.json({ message: "Updated successfully" });
  } catch (err) {
    console.error("Error in editTestimonial:", err);
    res.status(500).json({ message: err.message });
  }
};

export const approveTestimonialController = async (req, res) => {
  try {
    const newImages = req.files ? req.files.map((file) => file.filename) : null;
    const image = req.body?.image || null;

    // Use uploaded files or body image data
    const imageData = newImages || image;

    await approveTestimonial(req.params.id, imageData);
    res.json({ message: "Testimonial approved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeTestimonial = async (req, res) => {
  try {
    // Get testimonial to delete associated images
    const testimonial = await getTestimonialById(req.params.id);
    if (testimonial && testimonial.image && Array.isArray(testimonial.image)) {
      deleteFiles(testimonial.image, "testimonials");
    }

    await deleteTestimonial(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
