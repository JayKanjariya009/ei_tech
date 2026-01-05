import { useState, useEffect } from 'react'
import React from 'react'
import Breadcrumb from '../components/BreadCrumb'
import { MdArrowOutward, MdOutlineDone, MdThumbUp } from "react-icons/md"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { caseStudyAPI } from '../../utils/api'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'

function CaseStudy() {

    const [email, setEmail] = useState('');
    const [caseStudies, setCaseStudies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCaseStudies = async () => {
            try {
                const response = await api.get(`/api/case-studies?page=${currentPage}&limit=4`);
                const data = response.data?.data || response.data;
                setCaseStudies(Array.isArray(data) ? data : [data]);
                setTotalPages(response.data?.totalPages || 1);
            } catch (error) {
                console.error('Error fetching case studies:', error);
                setCaseStudies([]);
            }
        };
        fetchCaseStudies();
    }, [currentPage]);

    const handleSubscribe = async () => {
        if (!email) {
            alert('Please enter an email address');
            return;
        }
        try {
            await contactAPI.createContact({
                firstName: 'Newsletter',
                lastName: 'Subscriber',
                email: email,
                message: 'Newsletter subscription'
            });
            setEmail('');
            alert('Successfully subscribed!');
        } catch (error) {
            console.error('Error subscribing:', error);
            alert('Subscription failed. Please try again.');
        }
    };

    return (
        <>
            <div>
                <Breadcrumb />
            </div>

            <div className='max-w-6xl mx-4 sm:mx-8 lg:mx-auto px-4'>


                {/*  Case Studies Div */}

                <div className='flex flex-col mx-auto items-center justify-center'>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 my-6 lg:my-10'>
                        {caseStudies.map((caseStudy) => {
                            const imageUrl = caseStudy.image && caseStudy.image.length > 0
                                ? `http://localhost:5000/uploads/caseStudies/${caseStudy.image[0]}`
                                : "images/case-img1.png";

                            return (
                                <div key={caseStudy.id || caseStudy._id}>
                                    <div >
                                        <div>
                                            <img src={imageUrl} alt={caseStudy.title} />
                                        </div>

                                        <div className='relative mx-auto -top-6 sm:-top-8 lg:-top-10 bg-gray-100 w-full max-w-sm p-4 sm:p-5 rounded-lg hover:bg-linear-to-br hover:from-[#5233b8] hover:to-[#7c5ce0] transition-all duration-300 group'>
                                            <div className='flex justify-between items-start mb-3 cursor-pointer'
                                                onClick={() => navigate(`/casestudy/${caseStudy.id}`)}
                                            >
                                                <span className='bg-blue-100 text-blue-700 group-hover:bg-white group-hover:text-black rounded-lg px-3 py-1 text-sm transition-all duration-300'>
                                                    #{caseStudy.tag}
                                                </span>
                                                <MdArrowOutward className='bg-blue-100 text-blue-700 group-hover:bg-white group-hover:text-black rounded-full p-1 text-xl transition-all duration-300' />
                                            </div>
                                            <h3 className='text-black group-hover:text-white font-semibold text-base sm:text-lg transition-all duration-300'>
                                                {caseStudy.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    <div className='flex flex-wrap justify-center items-center gap-2 my-6 lg:my-8'>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className='px-3 sm:px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-blue-600 hover:text-white text-sm sm:text-base'
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${currentPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 hover:bg-blue-600 hover:text-white'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className='px-3 sm:px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-blue-600 hover:text-white text-sm sm:text-base'
                        >
                            Next
                        </button>
                        {/* 
                    <p>
                        {totalPages}
                    </p> */}
                    </div>
                </div>





            </div >

            {/* Message Div || TENTH DIV  */}
            <div className='relative bg-[url(/images/contact-bg2.png)] bg-cover bg-center bg-no-repeat py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-linear-to-r from-purple-900 via-indigo-900 to-purple-800'>
                <div className='container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0'>

                    {/* Left Content */}
                    <div className='flex-1 text-white max-w-lg text-center lg:text-left lg:ml-35'>
                        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight'>
                            Transform Your IT Today-<br className='hidden sm:block' />
                            Speak with Our Experts!
                        </h2>

                        <p className='text-sm sm:text-base lg:text-lg mb-6 lg:mb-8 opacity-90'>
                            Ready to take your business to  next level with cutting-edge IT<br className='hidden lg:block' />
                            solutions? Our team is here to help you transform.
                        </p>

                        <div className='relative flex flex-col sm:flex-row max-w-md mx-auto lg:mx-0 gap-2 sm:gap-0'>
                            <input
                                type="email"
                                placeholder='Email Address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='flex-1 px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-white text-gray-800 focus:outline-none'
                            />
                            <button
                                onClick={handleSubscribe}
                                className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] px-6 py-3 rounded-lg sm:rounded-r-lg sm:rounded-l-none flex items-center justify-center gap-2 text-white font-medium hover:opacity-90 transition-opacity'
                            >
                                Subscribe <MdArrowOutward />
                            </button>
                        </div>
                    </div>

                    {/* Center Services */}
                    <div className='hidden lg:flex flex-col gap-4 mx-8'>
                        <div className='flex items-center ml-15 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg'>
                            <MdOutlineDone className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white rounded-full p-1 mr-3' size={24} />
                            IT Solution Services
                        </div>

                        <div className='flex items-center mr-15 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg'>
                            <MdOutlineDone className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white rounded-full p-1 mr-3' size={24} />
                            Cyber Security Services
                        </div>

                        <div className='flex items-center ml-15 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg'>
                            <MdOutlineDone className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white rounded-full p-1 mr-3' size={24} />
                            Software Development
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className='relative shrink-0 lg:mr-25'>
                        <img
                            src="/images/contact-img1.png"
                            alt="Professional woman with tablet"
                            className='h-48 sm:h-64 lg:h-80 w-auto object-contain mx-auto'

                        />

                        <img src="images/contact-bg-bg2.png" alt="hey there"
                            className='absolute opacity-50 top-0 animate-[spin_15s_linear_infinite] hidden lg:block'
                        />


                    </div>
                </div>
            </div>


        </>
    )
}

export default CaseStudy
