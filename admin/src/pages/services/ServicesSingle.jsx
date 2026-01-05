import React, { useEffect, useState } from 'react'
import { serviceAPI } from '../../utils/api';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton'

function ServicesSingle() {
    const { id } = useParams()
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_URL = "http://localhost:5000";

    useEffect(() => {
        const fetchSingleService = async () => {
            try {
                setLoading(true);
                const response = await serviceAPI.getSingleService(id)
                console.log(response);
                setService(response.data)
                setError(null);
            } catch (error) {
                console.error('Error fetching service:', error);
                setError('Failed to load service details.');
            } finally {
                setLoading(false);
            }
        }

        fetchSingleService();
    }, [id])

    if (loading) {
        return <div className='p-4'>Loading service details...</div>
    }

    if (error) {
        return <div className='p-4 text-red-500'>{error}</div>
    }

    if (!service) {
        return <div className='p-4'>Service not found.</div>
    }

    return (
        <>
            <BackButton />
            <div className='max-w-4xl mx-auto p-2 sm:p-4'>
                <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6'>
                        <h1 className='text-sm sm:text-base font-medium'>
                            ID: {service.id}
                        </h1>
                        <h1 className='text-lg sm:text-xl font-bold sm:ml-auto'>
                            {service.title}
                        </h1>
                    </div>

                    <div className='mb-4 sm:mb-6'>
                        <h2 className='text-xs sm:text-sm text-gray-600'>
                            Created On: {new Date(service.created_at).toLocaleDateString('en-GB')}
                        </h2>
                    </div>

                    <div className='space-y-4 sm:space-y-6'>
                        <div>
                            <h1 className='text-base sm:text-lg font-semibold mb-2 sm:mb-3'>Icon:</h1>
                            {service.icon ? (
                                <img
                                    src={`${BASE_URL}${service.icon}`}
                                    alt="Service Icon"
                                    className='w-20 h-20 sm:w-32 sm:h-32 bg-black object-contain rounded p-2 sm:p-3'
                                />
                            ) : (
                                <p className='text-gray-500 text-sm sm:text-base'>No icon available</p>
                            )}
                        </div>
                        
                        <div>
                            <h1 className='text-base sm:text-lg font-semibold mb-2 sm:mb-3'>Images:</h1>
                            {service.images && service.images.length > 0 ? (
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4'>
                                    {service.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`${BASE_URL}${image}`}
                                            alt={`Image ${index}`}
                                            className='w-full h-32 sm:h-48 object-cover rounded'
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className='text-gray-500 text-sm sm:text-base'>No images available</p>
                            )}
                        </div>
                    </div>

                    <div className='mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg'>
                        <h3 className='font-semibold mb-2 text-sm sm:text-base'>Description:</h3>
                        <p className='text-sm sm:text-base text-gray-700 leading-relaxed'>{service.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServicesSingle