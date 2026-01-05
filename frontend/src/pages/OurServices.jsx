import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/BreadCrumb'
import Pagination from '../components/Pagination'
import { serviceAPI, contactAPI } from '../../utils/api'
import { MdArrowOutward, MdThumbUp, MdOutlineDone } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "../App.css"








function OurServices() {

    const [services, setServices] = useState([])
    const [email, setEmail] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pagination, setPagination] = useState({
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        const fetchservices = async () => {
            setLoading(true)
            try {
                const response = await serviceAPI.getServices(currentPage, 10);
                setServices(response.data.services);
                setPagination(response.data.pagination);
            } catch (error) {
                console.log("Error Fetching Services:", error);
            } finally {
                setLoading(false)
            }
        }
        fetchservices()
    }, [currentPage])

    const handlePageChange = (page) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

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

            {/* Service  Div */}
            <div className='mx-auto max-w-7xl px-4'>
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#300B9BFF]"></div>
                    </div>
                ) : (
                    <>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
                            {services.map((service, index) => {
                                const serviceId = service.id || service._id
                                const imageSrc = service.icon ? `http://localhost:5000/uploads/serviceIcons/${service.icon}` : null;

                                return (
                                    <div key={serviceId || index} className='group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-linear-to-r hover:from-[#300B9BFF] hover:to-[#665CEAFF] cursor-pointer'
                                        onClick={() => navigate(`/service/${serviceId}`)}
                                    >
                                        <div className='flex justify-between items-start mb-4'>
                                            <div className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] rounded-full p-3 group-hover:bg-white'>
                                                <img
                                                    src={imageSrc}
                                                    alt={service.title || "Service icon"}
                                                    className='w-8 h-8 object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0'
                                                    onError={(e) => {
                                                        console.log('Image failed to load:', imageSrc, e);
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                            <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-900 '>
                                                <MdArrowOutward className='bg-white p-2  text-[#300B9BFF] text-4xl rounded-full' />
                                            </div>
                                        </div>

                                        <div className='space-y-3'>
                                            <h2 className='text-xl font-bold text-gray-900 group-hover:text-white'>
                                                {service.title}
                                            </h2>
                                            <p className='text-gray-600 group-hover:text-gray-200 text-sm leading-relaxed'>
                                                {service.description}
                                            </p>
                                            <div className='flex items-center'>
                                                <div className='w-12 h-0.5 bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] group-hover:bg-white'></div>
                                                <span className='ml-3 text-sm font-semibold text-[#300B9BFF] group-hover:text-white'>
                                                    {String((currentPage - 1) * pagination.itemsPerPage + index + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>



            {/* Our Vision/Mission */}

            <div className='mx-4 sm:mx-8 lg:mx-16 xl:mx-45 my-10 lg:my-20 py-10 lg:py-20 flex flex-col lg:flex-row gap-8 lg:gap-0 mb-10 lg:mb-20'>

                <div className='flex-1'>
                    <span className='flex items-center gap-2 bg-[#f1f1ff] w-55 p-1 rounded-lg'>
                        <MdThumbUp className='rounded-full text-3xl bg-linear-to-r  from-[#300B9BFF] to-[#665CEAFF]   text-white p-1' />
                        <p
                            className='uppercase font-semibold bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] bg-clip-text text-transparent'>    Our Vision/Mission</p>
                    </span>

                    <div>

                        <h3 className='text-5xl mt-5 font-semibold'>
                            Driving Innovation: Our <br />
                            Mission Vision at Eitech
                        </h3>

                        <p className='text-xl text-gray-700 mt-2'>
                            At the of innovation, our cutting-edge IT solutions are designed <br />
                            transform  your business ETech operations.
                        </p>



                        <div>

                            {services.slice(0, 2).map((service, index) => {
                                const serviceId = service.id || service._id;
                                const imageSrc = service.icon ? `http://localhost:5000/uploads/serviceIcons/${service.icon}` : null;



                                return (
                                    <div key={serviceId} className='flex bg-white  gap-4 p-4 mb-4 '>

                                        <div className='flex gap-4 items-center'
                                            onClick={() => {
                                                navigate(`/service/${serviceId}`)
                                            }}
                                        >

                                            <div >
                                                <img
                                                    src={imageSrc}
                                                    alt={service.title}
                                                    className='w-80 rounded-full p-2 bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] object-cover'
                                                    onError={(e) => {
                                                        console.log('Image failed to load:', imageSrc);
                                                    }}
                                                />
                                            </div>

                                            <div className=''>
                                                <h2 className='text-xl font-semibold'>{service.title}</h2>
                                                <p className='text-gray-500 line-clamp-2 '>{service.description}</p>
                                            </div>

                                        </div>




                                    </div>
                                );
                            })}
                        </div>

                        <div className='mx-50 '>
                            <Link to="/contactus">
                                <span className=' flex items-center text-white bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] rounded-lg p-2 w-60 cursor-pointer hover:opacity-90 transition-opacity'>
                                    <p className='text-xl'> See How We can Help</p>
                                    <MdArrowOutward className='text-2xl' />
                                </span>
                            </Link>
                        </div>

                    </div>


                </div>


                <div className='flex-1'>

                    <div className='relative '>

                        <img src="/images/our-mission-bg-design.png" alt=""
                            className='absolute w-50 -bottom-25  right-15 z-5'
                        />

                        <div className='relative z-10 '>
                            <img src="/images/our-mission-01.png" alt="" />
                        </div>

                        <div className='flex gap-3 mt-5 relative z-10 '>

                            <div>
                                <img src="/images/our-mission-02.png" alt="" />
                            </div>

                            <div>
                                <img src="/images/our-mission-03.png" alt="" />
                            </div>

                        </div>



                    </div>






                </div>


            </div>

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
                    <div className='hidden lg:flex flex-col gap-4 mx-8 animate-[bounce_3s_ease-in-out_infinite]'>
                        <div className='flex items-center ml-15 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg '>
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
                            src="//images/contact-img1.png"
                            alt="Professional woman with tablet"
                            className='h-48 sm:h-64 lg:h-80 w-auto object-contain mx-auto'

                        />

                        <img src="/images/contact-bg-bg2.png" alt="hey there"
                            className='absolute opacity-50 top-0 animate-[spin_15s_linear_infinite] hidden lg:block'
                        />


                    </div>
                </div>
            </div>


        </>
    )
}

export default OurServices
