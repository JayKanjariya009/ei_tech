import React, { useState } from 'react'
import { blogAPI } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'

function CreateNewBlog() {
    const navigate = useNavigate()


    const [blog, setBlog] = useState({
        title: "",
        author: "",
        content: "",
        tags: "",


    })

    const [images, setImages] = useState([]);

    const handleChange = (e) => {

        const { name, value } = e.target;
        setBlog(prev => ({ ...prev, [name]: value }));
    }



    const handleSubmit = async (e) => {
        e.preventDefault()


        const formData = new FormData();
        formData.append('title', blog.title);
        formData.append('content', blog.content);
        formData.append('author', blog.author);
        formData.append('tags', JSON.stringify(blog.tags.split(",").map(t => t.trim())));

        images.forEach((img) => {
            formData.append('images', img);
        });

        try {
            await blogAPI.addBlog(formData);
            alert("Blog added successfully!");
            navigate('/blogs');
        } catch (error) {
            console.error('Error adding blog:', error);
            alert('Failed to add blog. Please try again.');
        }

    }




    return (
        <>
            <BackButton />
            <div className='max-w-4xl mx-auto p-2 sm:p-4'>
                <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
                    <h1 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>Create New Blog</h1>
                    
                    <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Blog Images:</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => setImages([...e.target.files])}
                                className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mt-3">
                                {images.map((file, i) => (
                                    <img
                                        key={i}
                                        src={URL.createObjectURL(file)}
                                        className="w-full h-32 sm:h-40 object-cover rounded border"
                                        alt={`Preview ${i}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                                <label className='block mb-2 font-semibold text-sm sm:text-base'>Blog Title:</label>
                                <input type="text"
                                    name="title"
                                    placeholder='Blog Title'
                                    value={blog.title}
                                    onChange={handleChange}
                                    className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                                    required
                                />
                            </div>

                            <div>
                                <label className='block mb-2 font-semibold text-sm sm:text-base'>Author Name:</label>
                                <input type="text"
                                    name="author"
                                    placeholder='Author Name'
                                    value={blog.author}
                                    onChange={handleChange}
                                    className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Blog Content:</label>
                            <textarea
                                name="content"
                                placeholder='Write your blog content here...'
                                onChange={handleChange}
                                value={blog.content}
                                className='w-full bg-gray-100 p-2 sm:p-3 rounded border min-h-32 sm:min-h-40 text-sm sm:text-base'
                                rows={6}
                                required
                            />
                        </div>

                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Tags:</label>
                            <input type="text"
                                name='tags'
                                value={blog.tags}
                                onChange={handleChange}
                                placeholder='react, node, javascript (comma separated)'
                                className='w-full p-2 sm:p-3 bg-gray-100 rounded border text-sm sm:text-base'
                            />
                            <p className='text-xs sm:text-sm text-gray-500 mt-1'>Separate tags with commas</p>
                        </div>

                        <button type='submit'
                            className='w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white p-2 sm:p-3 px-4 sm:px-6 rounded transition-colors text-sm sm:text-base'
                        >
                            Add Blog
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateNewBlog
