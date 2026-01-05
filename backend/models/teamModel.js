import pool from "../config/db.js";

export const getAllTeamMembers = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM team ORDER BY id DESC"
  );
  return rows;
};

export const getTeamMemberById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM team WHERE id = ? LIMIT 1", [id]);
  return rows[0];
};

export const createTeamMember = async ({ name, position, image, links, status }) => {
  const [result] = await pool.query(
    "INSERT INTO team (name, position, image, links, status) VALUES (?, ?, ?, ?, ?)",
    [name, position, JSON.stringify(image), JSON.stringify(links), status || 'active']
  );
  return result.insertId;
};

export const updateTeamMember = async (id, data) => {
  const fields = [];
  const values = [];

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'image' || key === 'links') {
      fields.push(`${key} = ?`);
      values.push(JSON.stringify(value));
    } else {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  });

  values.push(id);
  const sql = `UPDATE team SET ${fields.join(", ")} WHERE id = ?`;
  const [result] = await pool.query(sql, values);
  return result.affectedRows;
};

export const deleteTeamMember = async (id) => {
  const [result] = await pool.query("DELETE FROM team WHERE id = ?", [id]);
  return result.affectedRows;
};