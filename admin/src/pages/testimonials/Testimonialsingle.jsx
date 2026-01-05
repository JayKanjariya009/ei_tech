import React, { useEffect, useState } from 'react'
import { testimonialAPI } from '../../utils/api';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton'

function Testimonialsingle() {

    const { id } = useParams()
    const [testimonial, setTestimonial] = useState([]);

    const BASE_URL = "http://localhost:5000/uploads";

    useEffect(() => {
        const fetchSingleTestimonial = async () => {
            const response = await testimonialAPI.getSingleTestimonial(id)
            console.log(response.data);
            setTestimonial(response.data)
        }

        fetchSingleTestimonial();
    }, [])

    return (
        <>
            <BackButton />
            <div className='max-w-4xl mx-auto p-2 sm:p-4'>
                <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6'>
                        <h1 className='text-sm sm:text-base font-medium'>
                            ID: {testimonial.id}
                        </h1>
                        <h1 className='text-lg sm:text-xl font-bold sm:ml-auto'>
                            {testimonial.user_name}
                        </h1>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6'>
                        <div>
                            <span className='text-xs sm:text-sm text-gray-600'>Email:</span>
                            <p className='text-sm sm:text-base font-medium'>{testimonial.user_email}</p>
                        </div>
                        <div className='text-left sm:text-right'>
                            <span className='text-xs sm:text-sm text-gray-600'>Status:</span>
                            <p className={`text-sm sm:text-base font-medium ${
                                testimonial.status === 'approved' ? 'text-green-600' : 'text-yellow-600'
                            }`}>{testimonial.status}</p>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6'>
                        <div>
                            <span className='text-xs sm:text-sm text-gray-600'>Rating:</span>
                            <p className='text-sm sm:text-base font-medium'>{testimonial.rating}/5 ⭐</p>
                        </div>
                        <div className='text-left sm:text-right'>
                            <span className='text-xs sm:text-sm text-gray-600'>Created On:</span>
                            <p className='text-sm sm:text-base'>{new Date(testimonial.created_at).toLocaleDateString('en-GB')}</p>
                        </div>
                    </div>

                    {testimonial.image && testimonial.image.length > 0 && (
                        <div className='mb-4 sm:mb-6'>
                            <h3 className='text-base sm:text-lg font-semibold mb-2 sm:mb-3'>Images:</h3>
                            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3'>
                                {testimonial.image.map((img, index) => (
                                    <img
                                        key={index}
                                        src={`${BASE_URL}/testimonials/${img}`}
                                        alt={testimonial.user_name}
                                        className='w-full h-20 sm:h-24 object-cover rounded'
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className='p-3 sm:p-4 bg-gray-50 rounded-lg'>
                        <h3 className='font-semibold mb-2 text-sm sm:text-base'>Message:</h3>
                        <p className='text-sm sm:text-base text-gray-700 leading-relaxed'>{testimonial.message}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonialsingle
