import React, { useEffect, useState } from 'react'
import { blogAPI } from '../../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton'

function EditBlog() {

    const { id } = useParams()
    const navigate = useNavigate()
    const [blog, setBlog] = useState({
        title: "",
        content: "",
        author: "",
        tags: [],
        images: []
    });
    const [newImages, setNewImages] = useState([]);
    const [removeAllImages, setRemoveAllImages] = useState(false);

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No token found. Please login first.');
            return;
        }

        try {
            if (removeAllImages) {
                // Send JSON request for image removal
                const updateData = {
                    title: blog.title,
                    content: blog.content,
                    author: blog.author,
                    removeImages: 'true'
                };

                if (blog.tags && blog.tags.length > 0) {
                    updateData.tags = blog.tags;
                }

                await blogAPI.editBlog(id, updateData);
            } else {
                // Send FormData for regular updates
                const formData = new FormData();
                formData.append('title', blog.title);
                formData.append('content', blog.content);
                formData.append('author', blog.author);

                if (blog.tags && blog.tags.length > 0) {
                    formData.append('tags', JSON.stringify(blog.tags));
                }

                if (newImages.length > 0) {
                    newImages.forEach(file => {
                        formData.append("images", file);
                    });
                }

                await blogAPI.editBlog(id, formData);
            }

            alert("Blog updated!");
            setRemoveAllImages(false);
        } catch (error) {
            console.error('Update failed:', error);
            console.error('Error response:', error.response);
            if (error.response?.status === 401) {
                alert('You are not authorized. Please login again.');
            } else {
                alert('Failed to update blog. Please try again.');
            }
        }
    };


    const BASE_URL = "http://localhost:5000/uploads";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog(prev => ({ ...prev, [name]: value }));
    };

    const handleRemoveAllImages = () => {
        setRemoveAllImages(true);
        setBlog(prev => ({ ...prev, images: [] }));
    };

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
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6'>
                        <h1 className='text-sm sm:text-base font-medium'>
                            ID: {blog.id}
                        </h1>
                        <input
                            type="text"
                            name="title"
                            value={blog.title}
                            onChange={handleChange}
                            className="w-full sm:flex-1 border p-2 sm:p-3 rounded text-sm sm:text-base font-bold"
                            placeholder="Blog Title"
                        />
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

                    <div className='space-y-4 sm:space-y-6'>
                        {/* Images Section */}
                        <div>
                            <h3 className='font-bold mb-2 sm:mb-3 text-sm sm:text-base'>Blog Images:</h3>
                            {blog.images && blog.images.length > 0 && !removeAllImages ? (
                                <div className='mb-3 sm:mb-4'>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-3'>
                                        {blog.images.map((img, i) => (
                                            <img
                                                key={i}
                                                src={`${BASE_URL}/blogImages/${img}`}
                                                className="w-full h-32 sm:h-40 object-cover rounded"
                                                alt={`Blog image ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleRemoveAllImages}
                                        className="bg-red-500 text-white px-3 py-1 sm:py-2 rounded text-xs sm:text-sm hover:bg-red-600 transition-colors"
                                    >
                                        Remove All Images
                                    </button>
                                </div>
                            ) : (
                                <p className='text-gray-500 mb-2 sm:mb-3 text-sm sm:text-base'>No images</p>
                            )}

                            <div>
                                <label className='block mb-2 text-sm sm:text-base font-medium'>Add New Images:</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => setNewImages(Array.from(e.target.files))}
                                    className="w-full border p-2 rounded text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        {/* Tags Section */}
                        <div>
                            <label className='block mb-2 text-sm sm:text-base font-medium'>Edit Tags:</label>
                            <input
                                type="text"
                                value={blog.tags ? blog.tags.join(", ") : ""}
                                onChange={(e) =>
                                    setBlog(prev => ({
                                        ...prev,
                                        tags: e.target.value.split(",").map(t => t.trim())
                                    }))
                                }
                                className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
                                placeholder="tag1, tag2, tag3"
                            />
                            <p className='text-xs sm:text-sm text-gray-500 mt-1'>Separate tags with commas</p>
                        </div>

                        {/* Content Section */}
                        <div>
                            <label className='block mb-2 text-sm sm:text-base font-medium'>Edit Content:</label>
                            <textarea
                                name="content"
                                value={blog.content}
                                onChange={handleChange}
                                rows={8}
                                className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
                                placeholder="Blog content..."
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleUpdate}
                        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded mt-4 sm:mt-6 transition-colors text-sm sm:text-base"
                    >
                        Update Blog
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditBlog
