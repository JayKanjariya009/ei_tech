import pool from "../config/db.js";

//  FIND USER BY EMAIL  (Login Purpose)
export const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0];
};

//  FIND USER BY ID
export const findUserById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ? LIMIT 1", [
    id,
  ]);
  return rows[0];
};

//  CREATE USER (Register)
export const createUser = async ({ name, email, password, role }) => {
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role || "admin"]
  );
  return result.insertId;
};

//  GET ALL USERS (Admin Panel)
export const getAllUsers = async () => {
  const [rows] = await pool.query(
    "SELECT id, name, email, role, created_at FROM users ORDER BY id DESC"
  );
  return rows;
};

//  UPDATE USER (Name, Email, Role, etc)
export const updateUser = async (id, data) => {
  // Build dynamic SQL query (only update passed fields)
  const fields = [];
  const values = [];

  Object.entries(data).forEach(([key, value]) => {
    fields.push(`${key} = ?`);
    values.push(value);
  });

  values.push(id);

  const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

  const [result] = await pool.query(sql, values);
  return result.affectedRows;
};

//  DELETE USER
export const deleteUser = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows;
};
