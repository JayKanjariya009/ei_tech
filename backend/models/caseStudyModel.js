import pool from "../config/db.js";

const parseImage = (imageData) => {
  if (!imageData) return [];
  if (Array.isArray(imageData)) return imageData;
  try {
    const parsed = JSON.parse(imageData);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return typeof imageData === "string" ? [imageData] : [];
  }
};

// export const getAllCaseStudies = async () => {
// const sql = "SELECT * FROM case_studies ORDER BY id DESC LIMIT ? OFFSET ?";
//
// const [rows] = await pool.query(sql, [limit, offset]);
//
// console.log('Raw DB rows (before parsing):', rows.map(r => ({ id: r.id, imageRaw: r.image, imageType: typeof r.image })));
//
// const data = rows.map((row) => ({
//   ...row,
//   image: parseImage(row.image),
// }));

// const [[{ total }]] = await pool.query(
//   "SELECT COUNT(*) as total FROM case_studies"
// );

// const result = rows.map((row) => ({
//   ...row,
//   image: parseImage(row.image),
// }));

// console.log('After parsing:', result.map(r => ({ id: r.id, image: r.image })));

// return result;
// };

export const getAllCaseStudies = async (limit, offset) => {
  // 1️⃣ Fetch paginated data
  const sql = `
    SELECT * 
    FROM case_studies 
    ORDER BY id DESC 
    LIMIT ? OFFSET ?
  `;

  const [rows] = await pool.query(sql, [limit, offset]);

  const data = rows.map((row) => ({
    ...row,
    image: parseImage(row.image),
  }));

  // 2️⃣ Fetch total count
  const [[{ total }]] = await pool.query(
    "SELECT COUNT(*) as total FROM case_studies"
  );

  return { data, total };
};

export const getCaseStudyById = async (id) => {
  const sql = "SELECT * FROM case_studies WHERE id = ?";
  const [rows] = await pool.query(sql, [id]);
  if (rows.length === 0) return null;
  return {
    ...rows[0],
    image: parseImage(rows[0].image),
  };
};

export const createCaseStudy = async ({
  title,
  tag,
  description,
  image,
  status,
}) => {
  const sql = `INSERT INTO case_studies (title, tag, description, image, status) VALUES (?, ?, ?, ?, ?)`;
  const imageJson = image ? JSON.stringify([image]) : null;
  const [result] = await pool.query(sql, [
    title,
    tag,
    description,
    imageJson,
    status || "active",
  ]);
  return result.insertId;
};

export const updateCaseStudy = async (
  id,
  { title, tag, description, image, status }
) => {
  const fields = [];
  const values = [];

  if (title !== undefined && title !== "") {
    fields.push("title = ?");
    values.push(title);
  }
  if (tag !== undefined && tag !== "") {
    fields.push("tag = ?");
    values.push(tag);
  }
  if (description !== undefined && description !== "") {
    fields.push("description = ?");
    values.push(description);
  }
  if (image !== undefined) {
    fields.push("image = ?");
    values.push(image ? JSON.stringify([image]) : null);
    // console.log('Updating image to:', image ? JSON.stringify([image]) : null);
  }
  if (status !== undefined && status !== "") {
    fields.push("status = ?");
    values.push(status);
  }

  if (fields.length === 0) {
    // console.log('No fields to update');
    return;
  }

  const sql = `UPDATE case_studies SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);
  // console.log('Update SQL:', sql, 'Values:', values);
  await pool.query(sql, values);
};

export const deleteCaseStudy = async (id) => {
  const sql = "DELETE FROM case_studies WHERE id = ?";
  await pool.query(sql, [id]);
};
