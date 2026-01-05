import pool from "../config/db.js";

//  SAVE CONTACT MESSAGE (FRONTEND)
export const saveContactMessage = async (data) => {
  const { name, email, subject, message } = data;

  const [result] = await pool.query(
    "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
    [name, email, subject || "General Inquiry", message]
  );

  return result.insertId;
};

//  GET ALL CONTACT MESSAGES (ADMIN)
export const getAllContactMessages = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM contact_messages ORDER BY id DESC"
  );
  return rows;
};

//  GET CONTACT MESSAGE BY ID
export const getContactById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM contact_messages WHERE id = ?",
    [id]
  );
  return rows[0];
};

//  DELETE CONTACT MESSAGE
export const deleteContactMessage = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM contact_messages WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};
