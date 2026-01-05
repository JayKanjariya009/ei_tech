import { useState, useEffect } from 'react';
import { blogAPI } from '../../utils/api';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: 'Admin',
    content: '',
    tags: '',
    images: []
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getBlogs();
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append('title', formData.title);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('content', formData.content);
    formDataToSend.append('tags', JSON.stringify(formData.tags.split(',').map(tag => tag.trim())));

    Array.from(formData.images).forEach(image => {
      formDataToSend.append('images', image);
    });

    try {
      if (editingBlog) {
        await blogAPI.editBlog(editingBlog.id, formDataToSend);
      } else {
        await blogAPI.addBlog(formDataToSend);
      }

      setFormData({ title: '', author: 'Admin', content: '', tags: '', images: [] });
      setShowForm(false);
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      author: blog.author,
      content: blog.content,
      tags: blog.tags.join(', '),
      images: []
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.removeBlog(id);
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <div className="blog-management pt-40">
      <div className="container">
        <div className="header">
          <h1>Blog Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="add-btn"
          >
            {showForm ? 'Cancel' : 'Add New Blog'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="blog-form">
            <input
              type="text"
              placeholder="Blog Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className='bg-gray-200'
            />

            <input
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className='bg-gray-200'
            />

            <textarea
              placeholder="Blog Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows="10"
                className='bg-gray-200'
              required
            />

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className='bg-gray-200'
            />

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, images: e.target.files })}
                className='bg-gray-200'
            />

            <button type="submit"
              className='bg-blue-600 rounded-lg p-2 text-white'
            >
              {editingBlog ? 'Update Blog' : 'Create Blog'}
              
            </button>
          </form>
        )}

        <div className="blogs-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                  <td>{blog.author}</td>
                  <td>{new Date(blog.created_at).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEdit(blog)}>Edit</button>
                    <button onClick={() => handleDelete(blog.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;