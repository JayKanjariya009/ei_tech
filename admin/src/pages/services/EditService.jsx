import React, { useEffect, useState } from 'react'
import { serviceAPI } from '../../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton'

function EditService() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [service, setService] = useState({
        title: "",
        description: "",
        icon: null,
        images: [],
        features: []
    });
    const [newImages, setNewImages] = useState([]);
    const [newIcon, setNewIcon] = useState(null);
    const [removeAllImages, setRemoveAllImages] = useState(false);
    const [removeIcon, setRemoveIcon] = useState(false);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('title', service.title || '');
            formData.append('description', service.description || '');

            if (removeAllImages) {
                formData.append('removeImages', 'true');
            } else if (newImages.length > 0) {
                newImages.forEach(file => {
                    formData.append("images", file);
                });
            }

            if (removeIcon) {
                formData.append('removeIcon', 'true');
            } else if (newIcon) {
                formData.append('icon', newIcon);
            }

            await serviceAPI.editService(id, formData);
            alert("Service updated!");
            navigate('/services');
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update service. Please try again.');
        }
    };

    const BASE_URL = "http://localhost:5000/uploads";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService(prev => ({ ...prev, [name]: value }));
    };

    const handleRemoveAllImages = () => {
        setRemoveAllImages(true);
        setService(prev => ({ ...prev, images: [] }));
    };

    const handleRemoveIcon = () => {
        setRemoveIcon(true);
        setService(prev => ({ ...prev, icon: null }));
    };

    useEffect(() => {
        const fetchSingleService = async () => {
            try {
                const response = await serviceAPI.getSingleService(id);
                console.log('Service data:', response.data);
                
                const serviceData = response.data;
                setService({
                    title: serviceData.title || '',
                    description: serviceData.description || '',
                    icon: serviceData.icon || null,
                    images: serviceData.images || [],
                    features: serviceData.features || [],
                    id: serviceData.id,
                    created_at: serviceData.created_at
                });
            } catch (error) {
                console.error('Error fetching service:', error);
            }
        };

        fetchSingleService();
    }, [id]);

    return (
        <>
            <BackButton />
            <div className='max-w-4xl mx-auto p-2 sm:p-4'>
                <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6'>
                        <h1 className='text-sm sm:text-base font-medium'>
                            ID: {service.id}
                        </h1>
                        <input
                            type="text"
                            name="title"
                            value={service.title || ''}
                            onChange={handleChange}
                            className="w-full sm:w-auto border p-2 sm:p-3 rounded text-sm sm:text-base font-bold flex-1"
                            placeholder="Service Title"
                        />
                    </div>

                    <div className='mb-4 sm:mb-6'>
                        <h2 className='text-xs sm:text-sm text-gray-600'>
                            Created On: {new Date(service.created_at).toLocaleDateString('en-GB')}
                        </h2>
                    </div>

                    <div className='space-y-4 sm:space-y-6'>
                        {/* Icon Section */}
                        <div>
                            <h3 className='font-bold mb-2 sm:mb-3 text-sm sm:text-base'>Service Icon:</h3>
                            {service.icon && !removeIcon ? (
                                <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center mb-3 sm:mb-4'>
                                    <img
                                        src={service.icon}
                                        className="h-12 w-12 sm:h-16 sm:w-16 rounded object-cover"
                                        alt="Service Icon"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveIcon}
                                        className="bg-red-500 text-white px-3 py-1 sm:py-2 rounded text-xs sm:text-sm hover:bg-red-600 transition-colors"
                                    >
                                        Remove Icon
                                    </button>
                                </div>
                            ) : (
                                <p className='text-gray-500 mb-2 sm:mb-3 text-sm sm:text-base'>No icon</p>
                            )}
                            
                            <div className='mb-3 sm:mb-4'>
                                <label className='block mb-2 text-sm sm:text-base font-medium'>Upload New Icon:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setNewIcon(e.target.files[0])}
                                    className="w-full border p-2 rounded text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        {/* Images Section */}
                        <div>
                            <h3 className='font-bold mb-2 sm:mb-3 text-sm sm:text-base'>Service Images:</h3>
                            {service.images && service.images.length > 0 && !removeAllImages ? (
                                <div className='mb-3 sm:mb-4'>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-3'>
                                        {service.images.map((img, i) => (
                                            <img
                                                key={i}
                                                src={img}
                                                className="w-full h-32 sm:h-40 rounded object-cover"
                                                alt={`Service image ${i + 1}`}
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
                    </div>

                    <div className='mt-4 sm:mt-6'>
                        <label className='block mb-2 text-sm sm:text-base font-medium'>Edit Description:</label>
                        <textarea
                            name="description"
                            value={service.description || ''}
                            onChange={handleChange}
                            rows={6}
                            className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
                            placeholder="Service Description"
                        />
                    </div>

                    <button
                        onClick={handleUpdate}
                        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded mt-4 sm:mt-6 transition-colors text-sm sm:text-base"
                    >
                        Update Service
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditService