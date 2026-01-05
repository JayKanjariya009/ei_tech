import React, { useEffect, useState } from 'react'
import { blogAPI } from '../../utils/api'
import { FaPen, FaPlus, FaRegEye } from 'react-icons/fa'
import { ImBin2 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'



function Blogs() {

    const [blogs, setblogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const navigate = useNavigate()

    const handleDeleteBlog = async (id) => {
        try {
            const response = await blogAPI.removeBlog(id)
            console.log(response);
            alert("Blog deleted successfully!")
            fetchBlogs()
        } catch (error) {
            console.log(error)
        }
    }


    const fetchBlogs = async (page = 1) => {
        try {
            const response = await blogAPI.getBlogs(page, 6)
            console.log(response);

            setblogs(response.data.data);
            setTotalPages(response.data.totalPages);
            setCurrentPage(page);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])


    return (
        <>
            <div className='max-w-7xl p-2 sm:p-4 font-semibold flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0'>
                <div className='mr-auto'>
                    <h1 className='text-lg sm:text-xl'>Blogs Management</h1>
                    <p className='text-xs sm:text-sm text-gray-600 font-normal'>
                        {blogs.length} blog{blogs.length !== 1 ? 's' : ''} found
                    </p>
                </div>
                <div>
                    <button className='bg-green-500 p-2 sm:p-3 m-1 sm:m-3 rounded flex items-center gap-2 sm:gap-3 text-white hover:bg-green-600 transition-colors text-sm sm:text-base'
                        onClick={() => { navigate("/newblog") }}
                    >
                        <span className='hidden sm:inline'>Create New Blog</span>
                        <span className='sm:hidden'>New Blog</span>
                        <FaPlus />
                    </button>
                </div>
            </div>

            <div className='bg-gray-200 p-1 sm:p-2'>
                {blogs.map((blog) => (
                    <div key={blog.id} className='flex flex-col sm:flex-row items-start sm:items-center bg-white p-2 sm:p-3 m-2 sm:m-4 rounded-lg shadow-md gap-2 sm:gap-0'>
                        <div className='p-2 sm:p-3 items-center'>
                            <h1 className='p-2 sm:p-3 bg-gray-300 rounded text-sm sm:text-base'>
                                {blog.id}
                            </h1>
                        </div>

                        <div className='flex-1 min-w-0'>
                            <h2 className='text-lg sm:text-xl font-bold truncate'>{blog.title}</h2>
                            <p className='text-gray-600 line-clamp-2 sm:line-clamp-1 p-1 text-sm sm:text-base'>{blog.content}</p>
                        </div>

                        <div className='flex gap-2 sm:gap-4 ml-auto'>
                            <FaRegEye className='bg-blue-400 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-blue-500 transition-colors'
                                onClick={() => { navigate(`/blogs/${blog.id}`) }}
                                title="View Blog"
                            />
                            <FaPen className='bg-green-400 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-green-500 transition-colors'
                                onClick={() => { navigate(`/blogs/edit/${blog.id}`) }}
                                title="Edit Blog"
                            />
                            <ImBin2 className='bg-red-500 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-red-600 transition-colors'
                                onClick={() => handleDeleteBlog(blog.id)}
                                title="Delete Blog"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className='flex justify-center gap-2 p-2 sm:p-4'>
                <button
                    onClick={() => fetchBlogs(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='px-2 sm:px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600 transition-colors text-sm sm:text-base'
                >
                    <span className='hidden sm:inline'>Previous</span>
                    <span className='sm:hidden'>Prev</span>
                </button>
                <span className='px-2 sm:px-3 py-1 text-sm sm:text-base'>{currentPage} of {totalPages}</span>
                <button
                    onClick={() => fetchBlogs(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='px-2 sm:px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:bg-blue-600 transition-colors text-sm sm:text-base'
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default Blogs
