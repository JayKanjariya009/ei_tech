import pool from "../config/db.js";

//  GET ALL APPROVED TESTIMONIALS
export const getApprovedTestimonials = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM testimonials WHERE status = 'approved' ORDER BY id DESC"
  );
  return rows;
};

//  GET ALL TESTIMONIALS (ADMIN)
export const getAllTestimonials = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM testimonials ORDER BY id DESC"
  );
  return rows;
};

//  ADD NEW TESTIMONIAL
export const addTestimonial = async (data) => {
  const { user_name, user_email, message, rating, image } = data;

  const [result] = await pool.query(
    "INSERT INTO testimonials (user_name, user_email, message, rating, image) VALUES (?, ?, ?, ?, ?)",
    [user_name, user_email, message, rating, JSON.stringify(image || [])]
  );

  return result.insertId;
};

//  GET TESTIMONIAL BY ID
export const getTestimonialById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM testimonials WHERE id = ?", [id]);
  return rows[0];
};

//  UPDATE TESTIMONIAL
export const updateTestimonial = async (id, data) => {
  const { user_name, user_email, message, rating, status, image } = data;
  
  // Get existing testimonial to preserve fields not being updated
  const existing = await getTestimonialById(id);
  if (!existing) throw new Error('Testimonial not found');
  
  const updatedUserName = user_name !== undefined ? user_name : existing.user_name;
  const updatedUserEmail = user_email !== undefined ? user_email : existing.user_email;
  const updatedMessage = message !== undefined ? message : existing.message;
  const updatedRating = rating !== undefined ? rating : existing.rating;
  const updatedStatus = status !== undefined ? status : existing.status;
  const updatedImage = image !== undefined ? image : (existing.image ? JSON.parse(existing.image) : []);
  
  const [result] = await pool.query(
    "UPDATE testimonials SET user_name = ?, user_email = ?, message = ?, rating = ?, status = ?, image = ? WHERE id = ?",
    [updatedUserName, updatedUserEmail, updatedMessage, updatedRating, updatedStatus, JSON.stringify(updatedImage), id]
  );
  return result.affectedRows;
};

//  APPROVE TESTIMONIAL
export const approveTestimonial = async (id, image = null) => {
  let query, params;
  
  if (image) {
    query = "UPDATE testimonials SET status = 'approved', image = ? WHERE id = ?";
    params = [JSON.stringify(image), id];
  } else {
    query = "UPDATE testimonials SET status = 'approved' WHERE id = ?";
    params = [id];
  }
  
  const [result] = await pool.query(query, params);
  return result.affectedRows;
};

//  DELETE TESTIMONIAL
export const deleteTestimonial = async (id) => {
  const [result] = await pool.query("DELETE FROM testimonials WHERE id = ?", [
    id,
  ]);
  return result.affectedRows;
};
