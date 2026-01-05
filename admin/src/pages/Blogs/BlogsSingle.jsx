import React, { useEffect, useState } from 'react'
import { blogAPI } from '../../utils/api';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton'

function BlogsSingle() {

    const { id } = useParams()
    const [blog, setBlog] = useState([]);

    const BASE_URL = "http://localhost:5000/uploads";


    useEffect(() => {

        const fetchSingleBlog = async () => {

            const response = await blogAPI.getSingleBlog(id)
            console.log(response);
            setBlog(response.data)


        }

        fetchSingleBlog();
    }, [])


    return (
        <>
            <BackButton />
            <div className='max-w-4xl mx-auto p-2 sm:p-4'>
                <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6'>
                        <h1 className='text-sm sm:text-base font-medium'>
                            ID: {blog.id}
                        </h1>
                        <h1 className='text-lg sm:text-xl font-bold sm:ml-auto'>
                            {blog.title}
                        </h1>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6'>
                        <div>
                            <span className='text-xs sm:text-sm text-gray-600'>Author:</span>
                            <p className='text-sm sm:text-base font-medium'>{blog.author}</p>
                        </div>
                        <div className='text-left sm:text-right'>
                            <span className='text-xs sm:text-sm text-gray-600'>Posted On:</span>
                            <p className='text-sm sm:text-base'>{new Date(blog.created_at).toLocaleDateString('en-GB')}</p>
                        </div>
                    </div>

                    {blog.images && blog.images.length > 0 && (
                        <div className='mb-4 sm:mb-6'>
                            <h3 className='text-base sm:text-lg font-semibold mb-2 sm:mb-3'>Images:</h3>
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4'>
                                {blog.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`${BASE_URL}/blogImages/${image}`}
                                        alt={`Image ${index}`}
                                        className='w-full h-32 sm:h-48 object-cover rounded'
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {blog.tags && blog.tags.length > 0 && (
                        <div className='mb-4 sm:mb-6'>
                            <h3 className='text-base sm:text-lg font-semibold mb-2'>Tags:</h3>
                            <div className='flex flex-wrap gap-1 sm:gap-2'>
                                {blog.tags.map((tag, index) => (
                                    <span key={index} className='bg-blue-500 text-white px-2 py-1 rounded text-xs sm:text-sm'>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className='p-3 sm:p-4 bg-gray-50 rounded-lg'>
                        <h3 className='font-semibold mb-2 text-sm sm:text-base'>Content:</h3>
                        <div className='text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap'>
                            {blog.content}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogsSingle
