import { useState, useEffect } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { blogAPI } from '../../utils/api';
import Breadcrumb from '../components/BreadCrumb';
import '../App.css';
import { MdArrowOutward, MdOutlineMessage } from 'react-icons/md';
import { FaFacebook, FaRegCalendar } from 'react-icons/fa';
import { BsInstagram, BsYoutube } from 'react-icons/bs';

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({ user_name: '', user_email: '', message: '' });
  const [replyForms, setReplyForms] = useState({});
  const [showReplyForm, setShowReplyForm] = useState({});

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getSingleBlog(id);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await blogAPI.getBlogComments(id);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await blogAPI.addComment(id, commentForm);
      setCommentForm({ user_name: '', user_email: '', message: '' });
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    try {
      await blogAPI.addReply(commentId, replyForms[commentId]);
      setReplyForms({ ...replyForms, [commentId]: { user_name: '', user_email: '', message: '' } });
      fetchComments();
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  if (loading) return <div className="loading">Loading blog...</div>;
  if (!blog) return <div className="error">Blog not found</div>;

  return (

    <>

      <div style={{ backgroundImage: 'url(images/hero-bg1.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Breadcrumb />
      </div>

      <div className="single-blog">

        <div className="container">

          <article className="blog-article">



            {blog.images && blog.images.length > 0 && (
              <div className="blog-images">
                {blog.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/uploads/blogImages/${image}`}
                    alt={`${blog.title} ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* <div className="blog-meta py-5">  */}
            <div className="gap-5 py-5 mx-1 flex">

              <span className='p-2 bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white rounded-lg hover:border-2 hover:border-black mx-5'>
                #{blog.tags}
              </span>

              <div className='w-px h-5 mt-2 items-center bg-gray-600'></div>

              <span className='mx-1 flex items-center gap-2'>
                <FaRegCalendar />
                {new Date(blog.created_at).toLocaleDateString()}
              </span>

              <div className='w-px h-5 mt-2 items-center bg-gray-600'></div>

              <span className='mx-1 flex items-center p-2 gap-2'>
                <MdOutlineMessage />
                {comments.length}
              </span>

            </div>

            <div className="blog-content">
              <h1
                className='text-xl font-semibold my-5'
              >
                {blog.title}
              </h1>
              <p>{blog.content}</p>
            </div>

            <hr className='lg:w-full text-gray-300 mt-5' />

            {blog.tags && blog.tags.length > 0 && (

              <div className='flex items-center gap-20'>

                <div className="blog-tags flex items-center gap-5">

                  <h1 className='my-5 font-semibold text-xl'>
                    Tags :
                  </h1>

                  {blog.tags.map((tag, index) => (
                    <span key={index} className="p-2 my-5 rounded-lg hover:text-white bg-[#f1f1f1] hover:bg-linear-to-l hover:from-[#300B9BFF] hover:to-[#665CEAFF]">
                      #{tag}
                    </span>

                  ))}
                </div>

                <div className='flex items-center gap-4'>

                  <h2
                    className='font-semibold text-xl'
                  >Social :
                  </h2>

                  <div className='flex gap-2 p-4'>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className='bg-[#f1f1f1] hover:bg-linear-to-r hover:from-[#300B9BFF] hover:to-[#665CEAFF] hover:text-white p-2 rounded-full text-black transition-all duration-300'>
                      <FaFacebook />
                    </a>
                    <div className='bg-[#f1f1f1] hover:bg-linear-to-r hover:from-[#300B9BFF] hover:to-[#665CEAFF] hover:text-white p-2 rounded-full text-black transition-all duration-300 cursor-pointer'>
                      <BsInstagram />
                    </div>
                    <div className='bg-[#f1f1f1] hover:bg-linear-to-r hover:from-[#300B9BFF] hover:to-[#665CEAFF] hover:text-white p-2 rounded-full text-black transition-all duration-300 cursor-pointer'>
                      <BsYoutube />
                    </div>
                  </div>

                </div>

              </div>
            )}
          </article>

          <section className="comments-section">
            <h1 className='text-3xl font-semibold my-8'>Blog Comments ({comments.length})</h1>

            <form onSubmit={handleCommentSubmit} className="comment-form bg-[#eff1ff] p-5 mb-8">
              <div className='flex gap-5'>
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentForm.user_name}
                  onChange={(e) => setCommentForm({ ...commentForm, user_name: e.target.value })}
                  required
                  className='bg-white'
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={commentForm.user_email}
                  onChange={(e) => setCommentForm({ ...commentForm, user_email: e.target.value })}
                  required
                  className='bg-white'
                />
              </div>
              <textarea
                placeholder="Your message"
                value={commentForm.message}
                onChange={(e) => setCommentForm({ ...commentForm, message: e.target.value })}
                required
                className='bg-white lg:min-h-20'
              />
              <button type="submit"
                className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] font-semibold text-xl text-white p-4 text-center rounded-md w-full flex items-center justify-center mx-auto'
              >
                <p>Leave A Reply</p>
                <p><MdArrowOutward /></p>
              </button>
            </form>

            <div className="comments-list space-y-6">
              {comments.map(comment => (
                <div key={comment.id} className="bg-[#f8f9ff] rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">{comment.user_name}</h4>
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <FaRegCalendar className="w-4 h-4" />
                            <span>{new Date(comment.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => setShowReplyForm(prev => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                          className="flex items-center gap-2 text-gray-600 hover:text-[#300B9BFF] transition-colors"
                        >
                          <MdOutlineMessage className="w-4 h-4" />
                          <span>Reply</span>
                        </button>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.message}</p>
                    </div>
                  </div>

                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-16 mt-4 space-y-4">
                      {comment.replies.map(reply => (
                        <div key={reply.id} className="bg-white rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full shrink-0"></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-semibold">{reply.user_name}</h5>
                                <span className="text-gray-500 text-sm">{new Date(reply.date).toLocaleDateString()}</span>
                              </div>
                              <p className="text-gray-700 ">
                                {reply.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {showReplyForm[comment.id] && (
                    <form
                      onSubmit={(e) => handleReplySubmit(e, comment.id)}
                      className="reply-form mt-4 ml-16"
                    >
                    <div className="flex gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={replyForms[comment.id]?.user_name || ''}
                        onChange={(e) => setReplyForms({
                          ...replyForms,
                          [comment.id]: { ...replyForms[comment.id], user_name: e.target.value }
                        })}
                        required
                        className="flex-1 p-2 border rounded"
                      />
                      <input
                        type="email"
                        placeholder="Your email"
                        value={replyForms[comment.id]?.user_email || ''}
                        onChange={(e) => setReplyForms({
                          ...replyForms,
                          [comment.id]: { ...replyForms[comment.id], user_email: e.target.value }
                        })}
                        required
                        className="flex-1 p-2 border rounded"
                      />
                    </div>
                    <textarea
                      placeholder="Your reply"
                      value={replyForms[comment.id]?.message || ''}
                      onChange={(e) => setReplyForms({
                        ...replyForms,
                        [comment.id]: { ...replyForms[comment.id], message: e.target.value }
                      })}
                      required
                      className="w-full p-2 border rounded mb-3"
                      rows="3"
                    />
                    <button type="submit" className="bg-[#300B9BFF] text-white px-4 py-2 rounded hover:bg-[#2509a3] transition-colors">
                      Reply
                    </button>
                    </form>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div>

      </div>

    </>
  );
};

export default SingleBlog;