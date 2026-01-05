import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../../utils/api';
import Breadcrumb from '../components/BreadCrumb';
import { PiCalendarDuotone } from 'react-icons/pi';
import { MdArrowOutward } from 'react-icons/md';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getBlogs(page, 6);
      setBlogs(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading blogs...</div>;

  return (
    <>
      <div>
        <Breadcrumb />
      </div>
      <div className="blog-list my-5 py-5">
        <div className="container ">

          <div className="blogs-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <div key={blog.id} className="blog-card">
                {blog.images.length > 0 && (
                  <img
                    src={`http://localhost:5000/uploads/blogImages/${blog.images[0]}`}
                    alt={blog.title}
                    className="blog-image w-full h-48 object-fit-contain"
                  />
                )}
                <div className="blog-content">

                  <div className="blog-meta bg-[#e2e1fd] w-35  px-3 py-1 rounded-lg">
                    <span
                      className='inline-flex gap-2 text-[#2e0797]  items-center'
                    >
                      <PiCalendarDuotone />
                      {new Date(blog.created_at).toLocaleDateString()}</span>

                  </div>

                  <div className='my-2'>
                    <h3 className='font-semibold   text-black hover:text-[#2e0797] '>{blog.title}</h3>

                  </div>




                  <div className='my-2 text-black hover:text-[#2e0797]'>
                    <Link to={`/blog/${blog.id}`} className="flex items-center gap-2">
                      <p>
                        Read More
                      </p>

                      <p>
                        <MdArrowOutward />
                      </p>
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2e0797] hover:text-white"
              >
                Previous
              </button>

              {/* First 3 pages */}
              {[1, 2, 3].map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-2 border rounded ${page === pageNum
                    ? 'bg-[#2e0797] text-white'
                    : 'hover:bg-[#2e0797] hover:text-white'
                    }`}
                >
                  {pageNum}
                </button>
              ))}

              {/* Ellipsis */}
              {totalPages > 6 && (
                <span className="px-3 py-2">......</span>
              )}

              {/* Last 3 pages */}
              {totalPages > 3 && [totalPages - 2, totalPages - 1, totalPages].map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-2 border rounded ${page === pageNum
                    ? 'bg-[#2e0797] text-white'
                    : 'hover:bg-[#2e0797] hover:text-white'
                    }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2e0797] hover:text-white"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogList;