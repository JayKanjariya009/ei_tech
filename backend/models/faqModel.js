import pool from "../config/db.js";

export const addFaq = async (data) => {
  const { category, question, answer, status = "active" } = data;
  const sql = `INSERT INTO faqs (category, question, answer, status) VALUES (?, ?, ?, ?)`;
  const [result] = await pool.query(sql, [category, question, answer, status]);
  return result.insertId;
};

export const getAllFaqs = async (category) => {
  let query = "SELECT * FROM faqs WHERE status = 'active'";
  let values = [];

  if (category && category !== "All") {
    query += " AND category = ?";
    values.push(category);
  }

  query += " ORDER BY created_at DESC";
  const [rows] = await pool.query(query, values);
  return rows;
};

export const getFaqById = async (id) => {
  const sql = `SELECT * FROM faqs WHERE id = ?`;
  const [rows] = await pool.query(sql, [id]);
  return rows.length > 0 ? rows[0] : null;
};

export const updateFaq = async (id, data) => {
  const fields = [];
  const values = [];
  Object.entries(data).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    values.push(value);
  });
  const sql = `UPDATE faqs SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);
  await pool.query(sql, values);
};

export const deleteFaq = async (id) => {
  const sql = `DELETE FROM faqs WHERE id = ?`;
  await pool.query(sql, [id]);
};
