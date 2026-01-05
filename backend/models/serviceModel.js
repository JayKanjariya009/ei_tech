// models/serviceModel.js
import pool from "../config/db.js";

// Add Service
export const addService = async (data) => {
  const { title, description, icon, images, features } = data;

  const sql = `
    INSERT INTO services (title, description, icon, images, features)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await pool.query(sql, [
    title,
    description,
    icon || null,
    JSON.stringify(images || []),
    JSON.stringify(features || []),
  ]);

  return result.insertId;
};

// Get All Services with Pagination
export const getAllServices = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  
  // Get total count
  const countSql = `SELECT COUNT(*) as total FROM services`;
  const [countResult] = await pool.query(countSql);
  const total = countResult[0].total;
  
  // Get paginated data
  const sql = `SELECT * FROM services ORDER BY id DESC LIMIT ? OFFSET ?`;
  const [rows] = await pool.query(sql, [parseInt(limit), parseInt(offset)]);

  const services = rows.map((service) => {
    let images = [];
    let features = [];

    try {
      images = service.images
        ? typeof service.images === "string"
          ? JSON.parse(service.images)
          : service.images
        : [];
    } catch (err) {
      console.error("Error parsing images:", err, service.images);
      images = [];
    }

    try {
      features = service.features
        ? typeof service.features === "string"
          ? JSON.parse(service.features)
          : service.features
        : [];
    } catch (err) {
      console.error("Error parsing features:", err, service.features);
      features = [];
    }

    return {
      ...service,
      icon: service.icon ? `/uploads/serviceIcons/${service.icon}` : null,
      images: images.map(img => `/uploads/serviceImages/${img}`),
      features,
    };
  });

  return {
    services,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: parseInt(limit)
    }
  };
};

// Get Single Service
export const getServiceById = async (id) => {
  const sql = `SELECT * FROM services WHERE id = ?`;
  const [rows] = await pool.query(sql, [id]);

  if (rows.length === 0) return null;

  const service = rows[0];
  let images = [];
  let features = [];

  try {
    images = service.images
      ? typeof service.images === "string"
        ? JSON.parse(service.images)
        : service.images
      : [];
  } catch (err) {
    console.error("Error parsing images:", err, service.images);
    images = [];
  }

  try {
    features = service.features
      ? typeof service.features === "string"
        ? JSON.parse(service.features)
        : service.features
      : [];
  } catch (err) {
    console.error("Error parsing features:", err, service.features);
    features = [];
  }

  return {
    ...service,
    icon: service.icon ? `/uploads/serviceIcons/${service.icon}` : null,
    images: images.map(img => `/uploads/serviceImages/${img}`),
    features,
  };
};

// Update Service
export const updateService = async (id, data) => {
  // dynamic query builder
  const fields = [];
  const values = [];

  Object.entries(data).forEach(([key, value]) => {
    if (key === "images" || key === "features") {
      fields.push(`${key} = ?`);
      values.push(JSON.stringify(value || []));
    } else {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  });

  const sql = `
    UPDATE services 
    SET ${fields.join(", ")} 
    WHERE id = ?
  `;

  values.push(id);

  await pool.query(sql, values);
};

// Delete Service

export const deleteService = async (id) => {
  const sql = `DELETE FROM services WHERE id = ?`;
  await pool.query(sql, [id]);
};
