import pool from "../config/db.js";

// Blog CRUD Operations
export const addBlog = async (data) => {
  const { title, author, content, tags, images } = data;
  const sql = `INSERT INTO blogs (title, author, content, tags, images) VALUES (?, ?, ?, ?, ?)`;
  const [result] = await pool.query(sql, [
    title,
    author || "Admin",
    content,
    JSON.stringify(tags || []),
    JSON.stringify(images || []),
  ]);
  return result.insertId;
};

export const getAllBlogs = async (limit, offset) => {
  // 1️⃣ Get paginated blogs
  const sql = `
    SELECT * 
    FROM blogs 
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `;
  const [rows] = await pool.query(sql, [limit, offset]);

  const data = rows.map((blog) => {
    let tags = [];
    let images = [];

    if (blog.tags) {
      if (Array.isArray(blog.tags)) {
        tags = blog.tags;
      } else if (typeof blog.tags === "string") {
        try {
          tags = JSON.parse(blog.tags);
        } catch {
          tags = [];
        }
      }
    }

    if (blog.images) {
      if (Array.isArray(blog.images)) {
        images = blog.images;
      } else if (typeof blog.images === "string") {
        try {
          images = JSON.parse(blog.images);
        } catch {
          images = [];
        }
      }
    }

    return { ...blog, tags, images };
  });

  // 2️⃣ Get total count
  const [[{ total }]] = await pool.query("SELECT COUNT(*) as total FROM blogs");

  return { data, total };
};



export const getBlogById = async (id) => {
  const sql = `SELECT * FROM blogs WHERE id = ?`;
  const [rows] = await pool.query(sql, [id]);
  if (rows.length === 0) return null;
  const blog = rows[0];

  let tags = [];
  let images = [];

  if (blog.tags) {
    if (Array.isArray(blog.tags)) {
      tags = blog.tags;
    } else if (typeof blog.tags === "string") {
      try {
        tags = JSON.parse(blog.tags);
      } catch (err) {
        tags = [];
      }
    }
  }

  if (blog.images) {
    if (Array.isArray(blog.images)) {
      images = blog.images;
    } else if (typeof blog.images === "string") {
      try {
        images = JSON.parse(blog.images);
      } catch (err) {
        images = [];
      }
    }
  }

  return { ...blog, tags, images };
};

export const updateBlog = async (id, data) => {
  const fields = [];
  const values = [];
  Object.entries(data).forEach(([key, value]) => {
    if (key === "tags" || key === "images") {
      fields.push(`${key} = ?`);
      values.push(JSON.stringify(value || []));
    } else {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  });
  const sql = `UPDATE blogs SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);
  await pool.query(sql, values);
};

export const deleteBlog = async (id) => {
  const sql = `DELETE FROM blogs WHERE id = ?`;
  await pool.query(sql, [id]);
};

// Comment CRUD Operations
export const addComment = async (data) => {
  const { blog_id, user_name, user_email, message, date } = data;
  const sql = `INSERT INTO blog_comments (blog_id, user_name, user_email, message, date) VALUES (?, ?, ?, ?, ?)`;
  const [result] = await pool.query(sql, [blog_id, user_name, user_email, message, date]);
  return result.insertId;
};

export const getCommentsByBlogId = async (blog_id) => {
  const sql = `SELECT * FROM blog_comments WHERE blog_id = ? ORDER BY date DESC`;
  const [rows] = await pool.query(sql, [blog_id]);
  return rows;
};

export const deleteComment = async (id) => {
  const sql = `DELETE FROM blog_comments WHERE id = ?`;
  await pool.query(sql, [id]);
};

// Reply CRUD Operations
export const addReply = async (data) => {
  const { comment_id, user_name, user_email, message, date } = data;
  const sql = `INSERT INTO blog_comment_replies (comment_id, user_name, user_email, message, date) VALUES (?, ?, ?, ?, ?)`;
  const [result] = await pool.query(sql, [
    comment_id,
    user_name,
    user_email,
    message,
    date,
  ]);
  return result.insertId;
};

export const getRepliesByCommentId = async (comment_id) => {
  const sql = `SELECT * FROM blog_comment_replies WHERE comment_id = ? ORDER BY date DESC`;
  const [rows] = await pool.query(sql, [comment_id]);
  return rows;
};

export const deleteReply = async (id) => {
  const sql = `DELETE FROM blog_comment_replies WHERE id = ?`;
  await pool.query(sql, [id]);
};
