import React, { useEffect, useState, useRef } from 'react'
import Breadcrumb from '../components/BreadCrumb'
import { testimonialAPI } from '../../utils/api'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { MdThumbUp, MdArrowOutward } from 'react-icons/md'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const swiperRef = useRef(null);
    const thumbsRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await testimonialAPI.getTestimonials();
                setTestimonials(response.data || []);
                if (response.data && response.data.length > 0) {
                    setSelectedTestimonial(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };

        fetchTestimonials();
    }, [])


    return (
        <>
            <div>
                <Breadcrumb />

            </div>

            <div className='mx-4 sm:mx-8 lg:mx-16 xl:mx-35'>


                {/* Testimonials Div || Seventh Div */}
                <div className=' '>

                    <div className='mx-4 sm:mx-8 lg:mx-16 xl:mx-35 flex flex-col lg:flex-row mt-6 lg:mt-10 gap-6 lg:gap-15 mb-6 lg:mb-10'>

                        <div className='flex-1 lg:flex-2 w-full lg:w-350 rounded-lg order-2 lg:order-1'>

                            <img src="images/testimonial-img0.png" alt="Default testimonial"
                                className='w-full h-48 sm:h-64 lg:h-84 object-cover rounded-lg' />

                        </div>

                        <div className='flex-1 w-full lg:w-350 px-4 sm:px-6 lg:px-8 py-6 lg:py-10 h-auto lg:h-96 rounded items-center order-1 lg:order-2'>

                            {testimonials.length > 0 ? (
                                <Swiper
                                    ref={swiperRef}
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={30}
                                    slidesPerView={1}
                                    direction='horizontal'
                                    loop={false}
                                    className='w-full h-auto lg:h-75'
                                    onSlideChange={(swiper) => {
                                        setCurrentIndex(swiper.activeIndex);
                                        if (thumbsRef.current && thumbsRef.current.swiper) {
                                            thumbsRef.current.swiper.slideTo(swiper.activeIndex);
                                        }
                                    }}
                                >
                                    {testimonials.map((testimonial) => {
                                        const imageUrl = testimonial.image && testimonial.image.length > 0
                                            ? `http://localhost:5000/uploads/testimonials/${testimonial.image[0]}`
                                            : null;

                                        return (
                                            <SwiperSlide key={testimonial.id || testimonial._id}>
                                                <div className='bg-linear-to-r from-blue-800 to-blue-600 p-4 sm:p-6 rounded-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 h-full'>
                                                    <div className='flex items-center mb-4'>
                                                        <div>
                                                            <img
                                                                src={imageUrl}
                                                                alt={testimonial.user_name}
                                                                className='w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mr-3 sm:mr-4'
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h4 className='font-semibold text-sm sm:text-lg'>{testimonial.user_name}</h4>
                                                                <img src="images/quito1.svg" alt="" />
                                                            </div>
                                                            <p className='text-white text-xs sm:text-sm'>{testimonial.user_email}</p>
                                                            <div className='flex text-yellow-400 mt-1'>
                                                                {[...Array(5)].map((_, i) => (
                                                                    <span key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-white'}>★</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className='text-gray-100 italic text-sm sm:text-base'>"{testimonial.message}"</p>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            ) : (
                                <div className='text-center py-10 text-gray-500'>
                                    No testimonials available yet.
                                </div>
                            )}
                        </div>

                        <div className='flex lg:flex-col items-center justify-center lg:justify-start gap-3 z-10 relative order-3 mt-4 lg:mt-0'>
                            {testimonials.length > 0 && (
                                <Swiper
                                    ref={thumbsRef}
                                    modules={[Navigation]}
                                    direction={window.innerWidth >= 1024 ? 'vertical' : 'horizontal'}
                                    slidesPerView={window.innerWidth >= 1024 ? 3 : 5}
                                    spaceBetween={10}
                                    className={window.innerWidth >= 1024 ? 'h-76 w-20' : 'h-20 w-full'}
                                    centeredSlides={true}
                                >
                                    {testimonials.map((testimonial) => {
                                        const imageUrl = testimonial.image && testimonial.image.length > 0
                                            ? `http://localhost:5000/uploads/testimonials/${testimonial.image[0]}`
                                            : null;

                                        return (
                                            <SwiperSlide key={testimonial.id || testimonial._id}>
                                                <div
                                                    className={`cursor-pointer rounded-full transition-all duration-300 overflow-hidden p-1 sm:p-2 ${currentIndex === testimonials.findIndex(t => (t.id === testimonial.id
                                                        || t._id === testimonial._id))
                                                        ? ' scale-105'
                                                        : 'hover:scale-105'
                                                        }`}
                                                    onClick={() => {
                                                        const index = testimonials.findIndex(t => (t.id === testimonial.id || t._id === testimonial._id));
                                                        if (swiperRef.current && swiperRef.current.swiper) {
                                                            swiperRef.current.swiper.slideTo(index);
                                                        }
                                                        setCurrentIndex(index);
                                                    }}
                                                >
                                                    <img
                                                        src={imageUrl}
                                                        alt={testimonial.user_name}
                                                        className='w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full mx-auto'
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            )}
                        </div>

                    </div>

                </div>

            </div>

            <div>



                <div className='bg-[#f1f1f1] py-10'>

                    <div className='mx-4 sm:mx-8 lg:mx-16 xl:mx-35 rounded-lg p-4 sm:p-6 lg:p-8'>

                        {testimonials.length > 0 ? (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                                {testimonials.map((testimonial) => {
                                    const imageUrl = testimonial.image && testimonial.image.length > 0
                                        ? `http://localhost:5000/uploads/testimonials/${testimonial.image[0]}`
                                        : null;

                                    return (
                                        <div key={testimonial.id || testimonial._id} className='bg-white p-4 sm:p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow'>
                                            <div className='flex items-center gap-3 mb-4'>
                                                <div>
                                                    <img
                                                        src={imageUrl}
                                                        alt={testimonial.user_name}
                                                        className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover'
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className='font-semibold text-gray-900 text-xs sm:text-sm'>{testimonial.user_name}</h3>
                                                    <p className='text-gray-500 text-xs'>{testimonial.user_email}</p>
                                                </div>
                                            </div>

                                            <div className='mb-4'>
                                                <p className='text-gray-600 leading-relaxed text-xs sm:text-sm'>
                                                    "{testimonial.message}"
                                                </p>
                                            </div>

                                            <hr className='border-gray-200 mb-4' />

                                            <div className='flex items-center justify-between'>
                                                <div>
                                                    <img src="images/google.png" alt="Google" className='h-4 sm:h-6' />
                                                </div>
                                                <div className='flex text-yellow-400'>
                                                    {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className='text-center py-10 text-gray-500'>
                                No testimonials available yet.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Testimonials
