import pool from "../config/db.js";

//  GET ACTIVE PROJECTS (FRONTEND)
export const getActiveProjects = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM projects WHERE status = 'active' ORDER BY id DESC"
  );
  return rows;
};

//  GET ALL PROJECTS (ADMIN)
export const getAllProjects = async () => {
  const [rows] = await pool.query("SELECT * FROM projects ORDER BY id DESC");
  return rows;
};

//  ADD PROJECT (ADMIN)
export const addProject = async (data) => {
  const { title, description, image } = data;

  const [result] = await pool.query(
    "INSERT INTO projects (title, description, image) VALUES (?, ?, ?)",
    [title, description, image]
  );

  return result.insertId;
};

//  GET PROJECT BY ID
export const getProjectById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM projects WHERE id = ?", [id]);
  return rows[0];
};

//  UPDATE PROJECT
export const updateProject = async (id, data) => {
  const { title, description, image, status } = data;
  const [result] = await pool.query(
    "UPDATE projects SET title = ?, description = ?, image = ?, status = ? WHERE id = ?",
    [title, description, image, status, id]
  );
  return result.affectedRows;
};

//  UPDATE STATUS
export const updateProjectStatus = async (id, status) => {
  const [result] = await pool.query(
    "UPDATE projects SET status = ? WHERE id = ?",
    [status, id]
  );
  return result.affectedRows;
};

//  DELETE PROJECT
export const deleteProject = async (id) => {
  const [result] = await pool.query("DELETE FROM projects WHERE id = ?", [id]);

  return result.affectedRows;
};
