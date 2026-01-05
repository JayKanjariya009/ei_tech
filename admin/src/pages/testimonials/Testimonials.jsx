import React, { useEffect, useState } from 'react'
import { testimonialAPI } from '../../utils/api'
import { FaPen, FaPlus, FaRegEye } from 'react-icons/fa'
import { ImBin2 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'



function Testimonials() {

    const [testimonials, setTestimonials] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await testimonialAPI.getAllTestimonialsAdmin();
                setTestimonials(response.data);
                console.log(response.data);

            } catch (error) {
                console.log("Error Fetching Testimonials ", error);
            }
        }

        fetchTestimonials();
    }, [])

    const handleDeleteTestimonial = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await testimonialAPI.removeTestimonial(id);
                setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
                alert('Testimonial deleted successfully!');
            } catch (error) {
                console.error('Error deleting testimonial:', error);
                alert('Failed to delete testimonial.');
            }
        }
    }


    return (
        <>
            <div className='max-w-7xl p-2 sm:p-4 font-semibold flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0'>
                <div className='mr-auto'>
                    <h1 className='text-lg sm:text-xl'>Testimonials Management</h1>
                    <p className='text-xs sm:text-sm text-gray-600 font-normal'>
                        {testimonials.length} testimonial{testimonials.length !== 1 ? 's' : ''} found
                    </p>
                </div>
                <div>
                    <button className='bg-green-500 p-2 sm:p-3 m-1 sm:m-3 rounded flex items-center gap-2 sm:gap-3 text-white hover:bg-green-600 transition-colors text-sm sm:text-base'
                        onClick={() => { navigate("/newtestimonial") }}
                    >
                        <span className='hidden sm:inline'>Create New Testimonial</span>
                        <span className='sm:hidden'>New Testimonial</span>
                        <FaPlus />
                    </button>
                </div>
            </div>

            <div className='bg-gray-200 p-1 sm:p-2'>
                {testimonials.map((testimonial, index) => (
                    <div key={testimonial.id} className='bg-gray-300 p-2 sm:p-3 m-2 sm:m-4 rounded-lg shadow-md'>
                        <div className='flex flex-col sm:flex-row gap-2 sm:gap-0'>
                            <div className='flex-1'>
                                <div className='flex flex-col sm:flex-row gap-2 sm:gap-5 p-1 sm:p-2'>
                                    <h2 className='font-semibold text-sm sm:text-base'>
                                        {testimonial.id}.
                                    </h2>
                                    <h2 className='font-semibold text-sm sm:text-base'>
                                        {testimonial.user_name}
                                    </h2>
                                    <h2 className='text-xs sm:text-sm text-gray-700 sm:ml-auto'>
                                        {testimonial.user_email}
                                    </h2>
                                </div>

                                <div className='p-1 sm:p-2'>
                                    <p className='text-gray-700 text-sm sm:text-base mb-2'>
                                        " {testimonial.message} "
                                    </p>
                                    <p className='text-black font-semibold text-xs sm:text-sm'>
                                        status: {testimonial.status}
                                    </p>
                                </div>
                            </div>

                            <div className='flex gap-2 sm:gap-4 justify-end sm:justify-start sm:m-4'>
                                <FaRegEye className='bg-blue-400 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-blue-500 transition-colors'
                                    onClick={() => { navigate(`/testimonials/${testimonial.id}`) }}
                                    title="View Testimonial"
                                />
                                <FaPen className='bg-green-400 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-green-500 transition-colors'
                                    onClick={() => { navigate(`/testimonials/edit/${testimonial.id}`) }}
                                    title="Edit Testimonial"
                                />
                                <ImBin2 className='bg-red-500 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-red-600 transition-colors'
                                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                                    title="Delete Testimonial"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Testimonials
