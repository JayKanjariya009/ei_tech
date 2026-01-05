import {
  addBlog as createBlogModel,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  addComment as createCommentModel,
  getCommentsByBlogId,
  deleteComment,
  addReply as createReplyModel,
  getRepliesByCommentId,
  deleteReply,
} from "../models/blogModel.js";
import { deleteFiles } from "../utils/fileUtils.js";

// Blog Controllers
export const addBlog = async (req, res) => {
  try {
    let images = [];
    if (req.files && req.files.images) {
      images = req.files.images.map((file) => file.filename);
    }

    let tags = [];
    if (req.body.tags) {
      try {
        tags = JSON.parse(req.body.tags);
      } catch (err) {
        tags = [];
      }
    }

    const newBlog = {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      tags,
      images,
    };

    const id = await createBlogModel(newBlog);
    res.status(201).json({ message: "Blog created", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const { data, total } = await getAllBlogs(limit, offset);

    res.json({
      success: true,
      data,
      page,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const data = await getBlogById(req.params.id);
    if (!data) return res.status(404).json({ message: "Blog not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editBlog = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.body.tags) {
      try {
        updateData.tags = JSON.parse(req.body.tags);
      } catch (err) {
        updateData.tags = [];
      }
    }

    const existing = await getBlogById(req.params.id);
    
    // Handle image updates
    if (req.body.removeImages === 'true') {
      // Remove all existing images
      if (existing && existing.images) {
        deleteFiles(existing.images, "blogs");
      }
      updateData.images = [];
    } else if (req.files && req.files.images) {
      // Replace with new images
      if (existing && existing.images) {
        deleteFiles(existing.images, "blogs");
      }
      updateData.images = req.files.images.map((file) => file.filename);
    }

    // Remove control flags from updateData
    delete updateData.removeImages;

    await updateBlog(req.params.id, updateData);
    res.json({ message: "Blog updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeBlog = async (req, res) => {
  try {
    // Delete associated images before deleting blog
    const existing = await getBlogById(req.params.id);
    if (existing && existing.images) {
      deleteFiles(existing.images, "blogs");
    }
    
    await deleteBlog(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Comment Controllers
export const addComment = async (req, res) => {
  try {
    const commentData = {
      blog_id: req.params.blogId,
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      message: req.body.message,
      date: new Date().toISOString().split("T")[0],
    };

    const id = await createCommentModel(commentData);
    res.status(201).json({ message: "Comment added", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const comments = await getCommentsByBlogId(req.params.blogId);
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await getRepliesByCommentId(comment.id);
        return { ...comment, replies };
      })
    );
    res.json(commentsWithReplies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeComment = async (req, res) => {
  try {
    await deleteComment(req.params.commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reply Controllers
export const addReply = async (req, res) => {
  try {
    const replyData = {
      comment_id: req.params.commentId,
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      message: req.body.message,
      date: new Date().toISOString().split("T")[0],
    };

    const id = await createReplyModel(replyData);
    res.status(201).json({ message: "Reply added", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeReply = async (req, res) => {
  try {
    await deleteReply(req.params.replyId);
    res.json({ message: "Reply deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
