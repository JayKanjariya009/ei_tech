import React, { useState } from 'react'
import { serviceAPI } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'

function CreateNewService() {
    const navigate = useNavigate()

    const [service, setService] = useState({
        title: "",
        description: ""
    })

    const [icon, setIcon] = useState(null);
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('title', service.title);
        formData.append('description', service.description);

        if (icon) {
            formData.append('icon', icon);
        }

        images.forEach((img) => {
            formData.append('images', img);
        });

        try {
            await serviceAPI.addService(formData);
            alert("Service added successfully!");
            navigate('/services');
        } catch (error) {
            console.error('Error adding service:', error);
            alert('Failed to add service. Please try again.');
        }
    }

    return (
        <>
            <BackButton />
            <div className='max-w-4xl mx-auto p-2 sm:p-4'>
                <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
                    <h1 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>Create New Service</h1>
                    
                    <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Service Icon:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setIcon(e.target.files[0])}
                                className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                            />
                            {icon && (
                                <div className="mt-2">
                                    <img
                                        src={URL.createObjectURL(icon)}
                                        className="w-24 h-24 sm:w-32 sm:h-32 rounded border object-cover"
                                        alt="Icon preview"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Service Images:</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => setImages([...e.target.files])}
                                className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                                {images.map((file, i) => (
                                    <img
                                        key={i}
                                        src={URL.createObjectURL(file)}
                                        className="w-full h-32 sm:h-40 rounded border object-cover"
                                        alt={`Image ${i}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Service Title:</label>
                            <input type="text"
                                name="title"
                                placeholder='Service Title'
                                value={service.title}
                                onChange={handleChange}
                                className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                                required
                            />
                        </div>

                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Service Description:</label>
                            <textarea
                                name="description"
                                placeholder='Service Description'
                                onChange={handleChange}
                                value={service.description}
                                className='w-full bg-gray-100 p-2 sm:p-3 rounded border min-h-20 sm:min-h-24 text-sm sm:text-base'
                                rows={4}
                                required
                            />
                        </div>

                        <button type='submit'
                            className='w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white p-2 sm:p-3 px-4 sm:px-6 rounded transition-colors text-sm sm:text-base'
                        >
                            Add Service
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateNewService