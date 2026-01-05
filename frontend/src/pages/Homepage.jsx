import React, { useState, useEffect } from 'react'
import "../App.css"
import { FaFacebook, FaRegThumbsUp } from "react-icons/fa";
import { MdArrowOutward, MdOutlineDone, MdThumbUp } from "react-icons/md";
import { FaPlayCircle } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { LiaKeySolid, LiaLinkedin } from 'react-icons/lia';
import { BiSolidLike } from 'react-icons/bi';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { serviceAPI, caseStudyAPI, testimonialAPI, teamAPI, blogAPI, contactAPI } from '../../utils/api.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaShareNodes } from "react-icons/fa6";


// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BsInstagram, BsYoutube } from 'react-icons/bs';



function Homepage() {

    const [services, setServices] = useState([]);
    const [caseStudies, setCaseStudies] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [team, setTeam] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [email, setEmail] = useState('');
    const [isVideoOpen, setIsVideoOpen] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {


        const fetchServices = async () => {
            try {
                const response = await serviceAPI.getServices();
                // Handle the new paginated response structure
                const servicesData = response.data.services || response.data || [];
                setServices(Array.isArray(servicesData) ? servicesData : []);
            } catch (error) {
                console.error('Error fetching services:', error);
                setServices([]);
            }
        };

        const fetchCaseStudies = async () => {
            try {
                const response = await caseStudyAPI.getCaseStudies();
                const data = response.data?.data || response.data;
                setCaseStudies(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error('Error fetching case studies:', error);
                setCaseStudies([]);
            }
        };

        const fetchTestimonials = async () => {
            try {
                const response = await testimonialAPI.getTestimonials();
                // console.log('Testimonials API response:', response);
                // console.log('Response data:', response.data);

                // Handle different response structures
                const data = response.data?.data || response.data || response || [];
                const testimonialsArray = Array.isArray(data) ? data : [data].filter(Boolean);

                // console.log('Processed testimonials:', testimonialsArray);
                // console.log('Testimonials length:', testimonialsArray.length);
                setTestimonials(testimonialsArray);

            } catch (error) {
                console.error('Error fetching testimonials:', error.response?.data || error.message || error);
                setTestimonials([]);
            }
        };

        const fetchTeam = async () => {

            try {
                const response = await teamAPI.getTeamMembers();
                // console.log('Team response:', response.data);
                setTeam(response.data.filter(member => member.status === 'active'));

            } catch (error) {
                console.log(" 'Error fetching team members: ", error);

            }
        }

        const fetchBlogs = async () => {
            try {
                const response = await blogAPI.getBlogs();
                // Handle the nested data structure
                const blogsData = response.data?.data || response.data || [];
                setBlogs(Array.isArray(blogsData) ? blogsData : []);
                console.log(response);

            } catch (error) {
                console.log('Error fetching blogs:', error);
                setBlogs([]);
            }
        }

        fetchServices();
        fetchCaseStudies();
        fetchTestimonials();
        fetchTeam();
        fetchBlogs();

    }, []);

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

            <div
                className='mx-auto'
            >


                {/* Hero div || First Div */}

                <div
                    style={{ backgroundImage: "url(/images/hero-bg1.png)" }}
                    className='min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden bg-linear-to-br from-purple-900 via-indigo-900 to-purple-800'
                >
                    {/* Background decorative images */}

                    <img src="/images/hero-bg-top-left-design.png" alt="" className='absolute left-0 top-20 w-32 md:w-48 opacity-80' />

                    <img src="/images/hero-bg-bottom-left-design.png" alt="" className='absolute bottom-0 left-0 w-40 md:w-60 opacity-80' />

                    <img src="/images/hero-bg-right-design.png" alt="" className='
                    absolute right-0 bottom-0 h-auto  md:w-60 lg:w-100  xl:w-300 ' />


                    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-36 flex flex-col lg:flex-row items-center justify-between min-h-screen relative z-10'>
                        {/* Left Content */}
                        <div className='flex-1 w-full lg:w-1/2 max-w-2xl mb-8 lg:mb-0 lg:pr-8'>

                            <div className='flex items-center justify-start text-white bg-[#5534c2] p-3 md:p-4 rounded-lg mb-6 w-fit'>
                                <FaRegThumbsUp className='mr-2 sm:mr-3 bg-white text-[#5534c2] rounded-full p-1 text-xl sm:text-2xl md:text-3xl shrink-0' />
                                <h2 className='text-sm sm:text-lg md:text-xl lg:text-2xl font-medium'>Create your Dream Project With Us</h2>
                            </div>

                            <div className='space-y-2 md:space-y-3 font-bold mb-6'>
                                <h1 className='text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight'>
                                    Advanced IT<br />
                                    Solutions For<br />
                                    Modern Businesses
                                </h1>
                            </div>

                            <div className='mb-8'>
                                <p className='text-white text-sm sm:text-base md:text-lg max-w-lg leading-relaxed'>
                                    We specialize in providing innovative scalable IT solutions tailored to meet the unique needs of your business, from comprehensive
                                </p>
                            </div>

                            <div className='flex flex-col sm:flex-row gap-4 items-center'>
                                <Link to="/ourservices">
                                    <button className="bg-white text-[#4b33ab] px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-100 transition-colors">
                                        <span className='text-base md:text-lg font-bold'>
                                            Explore Our Solutions</span>
                                        <MdArrowOutward className="text-lg" />
                                    </button>
                                </Link>

                                <button className='flex text-white items-center justify-center text-lg md:text-xl hover:text-gray-200 transition-colors'
                                    onClick={() => setIsVideoOpen(true)}
                                >
                                    <FaPlayCircle className='text-3xl md:text-4xl mr-2' />
                                    <span>Play Video</span>
                                </button>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className='flex-1 w-full lg:w-1/2 relative flex justify-center lg:justify-end mt-8 lg:mt-0'>
                            {/* Rotating element */}
                            <img src="/images/hero-bg-rotating.png" alt=""
                                className='absolute -top-4 sm:-top-6 md:-top-10 left-4 sm:left-8 md:left-12 w-12 sm:w-16 md:w-20 lg:w-50 animate-[spin_20s_linear_infinite] opacity-80 z-10' />

                            {/* Main hero images */}
                            <div className='relative w-full max-w-md lg:max-w-lg'>
                                <img src="/images/hero-bg-girl-bg.png" alt=""
                                    className='w-full h-auto' />
                                <img src="/images/hero-bg-girl.png" alt=""
                                    className='absolute top-4 sm:top-6 md:top-8 lg:top-10 left-4 sm:left-6 md:left-8 lg:left-0 w-3/4 sm:w-4/5 h-auto' />
                            </div>

                            {/* Floating badge */}
                            <img src="/images/635.png" alt=""
                                className='absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-0 right-2 sm:right-4 md:right-6 w-12 sm:w-16 md:w-40 lg:w-70 animate-[bounce_3s_linear_infinite]'
                            />
                        </div>

                        {/* Floating badge */}
                        <img src="/images/hero-bg-01.png" alt=""
                            className='absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 md:w-64 lg:w-100 animate-shake h-auto' />

                    </div>
                    {isVideoOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">

                            <div className="relative w-[90%] md:w-[800px] h-[450px] bg-black rounded-lg overflow-hidden">

                                {/* Close button */}
                                <button
                                    onClick={() => setIsVideoOpen(false)}
                                    className="absolute top-3 right-3 text-white text-2xl z-50"
                                >
                                    ✕
                                </button>

                                {/* YouTube Iframe */}
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/xMY1HpA0bWg"
                                    title="YouTube video"
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                ></iframe>

                            </div>
                        </div>
                    )}

                </div>


                {/* About us div || Second Div */}
                <div className='py-16 md:py-24 relative overflow-hidden lg:mx-35'>
                    {/* Background decorative images */}
                    <img src="/images/about-bg-bg-left.png" alt="" className='absolute left-0 top-0 h-full w-auto opacity-30 z-0 hidden lg:block' />
                    <img src="/images/about-left-top.png" alt="" className='absolute top-8 sm:top-12 md:top-16 left-4 sm:left-6 md:left-8 w-16 sm:w-20 md:w-24 lg:w-32 opacity-60 z-0' />

                    <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10'>
                        {/* Left Content - Images */}
                        <div className='flex-1 w-full lg:w-1/2 relative'>
                            {/* Floating badge */}
                            <div className='absolute top-4 sm:top-6 md:top-8 lg:top-16 right-4 sm:right-6 md:right-8 lg:right-16 bg-white p-3 sm:p-4 rounded-lg shadow-lg z-20 animate-[bounce_10s_linear_infinite] max-w-xs'>
                                <div className='flex items-center gap-2 sm:gap-3'>
                                    <div className='bg-blue-800 rounded-full p-1 sm:p-2 shrink-0'>
                                        <MdDone className='text-white text-lg sm:text-xl' />
                                    </div>
                                    <div>
                                        <p className='text-black text-xs sm:text-sm md:text-base font-medium'>
                                            With 15+ years of experience<br />
                                            IT solution help community.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Image grid */}
                            <div className='flex gap-2 sm:gap-3 md:gap-4 items-end'>
                                <div className='flex-1'>
                                    <img src="/images/about-img1.png" alt="" className='w-full h-auto rounded-lg' />
                                </div>
                                <div className='flex-1 space-y-2 sm:space-y-3 md:space-y-4'>
                                    <img src="/images/about-img2.png" alt="" className='w-full h-auto rounded-lg' />
                                    <img src="/images/about-img3.png" alt="" className='w-full h-auto rounded-lg' />
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Text */}
                        <div className='flex-1 w-full lg:w-1/2 max-w-2xl mt-8 lg:mt-0'>


                            <div className='flex items-center gap-2 sm:gap-3 bg-[#f2f2ff] p-2 sm:p-3 rounded-lg mb-4 sm:mb-6 w-fit'>
                                <BiSolidLike className='bg-[#472dba] text-white rounded-full p-1 text-lg sm:text-xl' />
                                <span className='text-[#472dba] uppercase font-semibold text-xs sm:text-sm md:text-base'>
                                    About Eitech IT Solution
                                </span>
                            </div>

                            <div className='mb-4 sm:mb-6'>
                                <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight'>
                                    Unlock Business<br />
                                    Potential with Tailored<br />
                                    IT Services
                                </h2>
                            </div>

                            <div className='mb-6 sm:mb-8'>
                                <p className='text-[#7e779d] text-sm sm:text-base md:text-lg leading-relaxed'>
                                    At Eitech, we understand that every business unique, which is why we offer customized IT solutions designed to meet.
                                </p>
                            </div>

                            <div className='flex flex-col sm:flex-row gap-6 md:gap-8 mb-8'>

                                {/* Left */}
                                <div className='flex'>

                                    <div className="w-24 ">
                                        <CircularProgressbar
                                            value={96}
                                            text={`96%`}
                                            styles={buildStyles({
                                                textColor: "#4b5563",
                                                pathColor: "#472dba",
                                                trailColor: "#7e779d",
                                            })}
                                        />

                                    </div>
                                    <div className='text-xl ml-2 mt-4'>
                                        <p
                                            className='font-semibold'
                                        >
                                            IT Solution
                                        </p>
                                        <p
                                            className='text-#7e779d'
                                        >
                                            Level is  High
                                        </p>
                                    </div>

                                </div>

                                {/* Right */}
                                <div>
                                    <div className='flex'>

                                        <div className="w-24 ">
                                            <CircularProgressbar
                                                value={97}
                                                text={`97%`}
                                                styles={buildStyles({
                                                    textColor: "#4b5563",
                                                    pathColor: "#472dba",
                                                    trailColor: "#7e779d",
                                                })}
                                            />

                                        </div>
                                        <div className='text-xl ml-2 mt-4'>
                                            <p
                                                className='font-semibold'
                                            >
                                                Cyber Solution

                                            </p>
                                            <p
                                                className='text-#7e779d'
                                            >
                                                #1 Best Of Solution
                                            </p>
                                        </div>

                                    </div>


                                </div>

                            </div>

                            <div className='p-4 bg-[#eff1ff] rounded-lg mb-5 '>

                                <p>
                                    “The right IT solutions done just support your on business- <br />
                                    they transform it, at Eitech, we believe.”
                                </p>
                            </div>

                            <div>
                                <Link to="/contactus">
                                    <button className='flex bg-linear-to-r from-blue-800 to-blue-600 text-white px-6 py-3 rounded-lg items-center gap-2 hover:from-blue-600 hover:to-blue-800 transition-all duration-900'>
                                        See How We can Help
                                        <MdArrowOutward
                                            className=''
                                        />
                                    </button>
                                </Link>
                            </div>


                        </div>

                    </div>




                </div>


                {/* Our Services div || Third Div */}
                <div className='bg-[#eff1ff] py-16 md:py-20 '>
                    <div className='container mx-auto px-4 '>
                        <div className='flex justify-center mb-8'>
                            <div className='flex items-center gap-2 bg-[#e2e3fe] text-[#3411a1] px-4 py-2 rounded-lg'>
                                <FaRegThumbsUp />
                                <h2 className='font-semibold'>Our Services</h2>
                            </div>
                        </div>

                        <div className='text-center mb-12'>
                            <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight'>
                                Expert IT Services Designed<br />
                                To Elevate Your Business
                            </h2>
                        </div>

                        {/* Service Display from backend */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
                            {services.map((service, index) => {
                                const serviceId = service.id || service._id;
                                const imageSrc = service.icon ? `http://localhost:5000/uploads/serviceIcons/${service.icon}` : null;

                                return (
                                    <div key={serviceId}
                                        className='group bg-white p-6 hover:text-white rounded-lg shadow-md hover:shadow-lg  cursor-pointer bg-linear-to-r hover:from-[#835ef0] hover:to-[#4327b6] transition-all duration-900'
                                        onClick={() => navigate(`/service/${serviceId}`)}>
                                        <div className='w-16 h-16 mb-4 rounded-full bg-white   flex items-center justify-center'>
                                            {service.icon ? (
                                                <img
                                                    src={imageSrc}
                                                    alt={service.title || 'Service'}
                                                    className='w-full h-full object-cover rounded-full p-2 bg-linear-to-r from-[#4327b6] to-[#835ef0] hover:from-[#835ef0] hover:to-[#4327b6] transition-all duration-300 group-hover:rotate-y-180'
                                                    onError={(e) => {
                                                        console.log('Image failed to load:', imageSrc);
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <span className='text-gray-400 text-xs'>No Icon</span>
                                            )}
                                        </div>
                                        <h3 className='text-xl font-semibold mb-2'>{service.title}</h3>
                                        <p className=' line-clamp-3'>{service.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>


                {/* Best IT Solution || fourth div */}
                <div className='py-16 md:py-20 lg:mx-35'>
                    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
                            {/* left side */}
                            <div className='flex-1 w-full lg:w-1/2'>
                                <div className='flex items-center gap-2 uppercase text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-[#3411a1] bg-[#f1f1ff] rounded-lg p-2 sm:p-3 w-fit mb-4 sm:mb-6'>
                                    <MdThumbUp className='bg-blue-300 p-1 text-xl sm:text-2xl rounded-full' />
                                    Best IT solution
                                </div>

                                <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6'>
                                    End-to-End IT Solutions for<br className='hidden sm:block' />
                                    Growing Businesses
                                </h2>

                                <p className='mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base'>
                                    We provide comprehensive, end-to-end IT solutions designed to support<br className='hidden lg:block' />
                                    businesses at every stage of growth.
                                </p>

                                <div className='mb-6 sm:mb-8 bg-[#d4e7fb] p-4 sm:p-5 rounded-lg'>
                                    <div className='mb-3 sm:mb-4'>
                                        <p className='mb-2 text-sm sm:text-base'>IT Solution</p>
                                        <progress
                                            className='[&::-webkit-progress-value]:bg-blue-800 [&::-moz-progress-bar]:bg-blue-600 rounded-full overflow-hidden w-full'
                                            value={95} max={100} />
                                    </div>

                                    <div className='mb-3 sm:mb-4'>
                                        <p className='mb-2 text-sm sm:text-base'>Cyber Security</p>
                                        <progress
                                            className='[&::-webkit-progress-value]:bg-blue-800 [&::-moz-progress-bar]:bg-blue-600 rounded-full overflow-hidden w-full'
                                            value={99} max={100} />
                                    </div>

                                    <div className='mb-2'>
                                        <p className='mb-2 text-sm sm:text-base'>Cloud Solution</p>
                                        <progress className='[&::-webkit-progress-value]:bg-blue-800 [&::-moz-progress-bar]:bg-blue-600 rounded-full overflow-hidden w-full' value={99} max={100} />
                                    </div>
                                </div>

                                <div>
                                    <Link to="/ourservices">
                                        <button className='flex bg-linear-to-r from-blue-800 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg items-center gap-2 hover:from-blue-600 hover:to-blue-800 transition-all duration-900 text-sm sm:text-base'>
                                            Discover Our Solutions
                                            <MdArrowOutward />
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Right side */}
                            <div className='flex-1 w-full lg:w-1/2 relative mt-8 lg:mt-0'>
                                <div className='relative flex justify-center'>
                                    <img src="/images/about-left-top.png" alt=""
                                        className='absolute top-0 right-8 sm:right-12 md:right-16 lg:right-20 z-10 w-8 sm:w-12 md:w-16'
                                    />

                                    <img src="/images/about-bg-bg-left.png" alt=""
                                        className='absolute top-0 right-0 z-10 rotate-180 h-64  sm:h-80 md:h-96 lg:h-full opacity-30'
                                    />

                                    <img src="/images/best-img1.png" alt=""
                                        className='relative z-20 w-48 sm:w-56 md:w-64 lg:w-72'
                                    />

                                    <img src="/images/best-img2.png" alt=""
                                        className='absolute -bottom-10 left-0 z-30 w-32 sm:w-40 md:w-48 lg:w-64'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Our Work || Fifth div */}
                <div className='py-16 md:py-20 '>
                    <div
                        style={{ backgroundImage: 'url(/images/hero-bg1.png)', objectFit: "cover" }}
                        className='relative py-16 md:py-40 bg-cover bg-center'
                    >
                        {/* <div className='absolute inset-0 bg-black bg-opacity-50'></div> */}

                        <div className='relative z-10 '>
                            <img src="/images/hero-bg-rotating.png" alt=""
                                className='absolute top-4 sm:top-6 md:top-8 right-4 sm:right-8 md:right-12 lg:right-50   w-12 sm:w-16 md:w-20 lg:w-24 animate-[spin_20s_linear_infinite]'
                            />

                            <img src="/images/right-hand.png" alt=""
                                className='absolute right-0 top-0 h-full w-auto opacity-50 hidden lg:block'
                            />

                            <div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
                                <div className='flex justify-center mb-6 sm:mb-8 md:mb-10'>
                                    <div className='flex items-center gap-2 bg-[#5233b8] px-3 sm:px-4 py-2 rounded-lg'>
                                        <span className='flex items-center text-[#5233b8] bg-white rounded-full p-1'>
                                            <MdThumbUp className='text-sm sm:text-base' />
                                        </span>
                                        <span className='uppercase text-white text-xs sm:text-sm md:text-base'>
                                            HOW IT WORKS
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h2 className='text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight'>
                                        Expert IT Services Designed<br className='hidden sm:block' />
                                        To Elevate Your Business
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='container mx-auto  px-4 sm:px-6 lg:px-8 relative -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-32 z-50 '>
                        <div className='bg-gray-200 lg:mx-15 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 lg:p-12'>
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-center'>
                                {/* Left Column */}
                                <div className='space-y-6  sm:space-y-8 md:mx-25 md:py-5'>
                                    <div className='relative'>
                                        <div className='relative'>
                                            <span className='absolute -top-6 sm:-top-8 md:-top-10 right-4 sm:right-6 md:right-8 rounded-full bg-linear-to-br from-[#5233b8] to-[#7c5ce0] px-2 sm:px-3 py-1 sm:py-2 text-white text-sm sm:text-base transition-all duration-300'>
                                                01
                                            </span>
                                            <img src="/images/left-top.png" alt=""
                                                className='absolute -top-3 sm:-top-4 md:-top-5 -right-8 sm:-right-12 md:-right-16 lg:-right-20 z-50 w-8 sm:w-12 md:w-16'
                                            />
                                        </div>
                                        <div className='text-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-[#f0f0ff] hover:bg-linear-to-br hover:from-[#5233b8] hover:to-[#7c5ce0] hover:text-white transition-all duration-300 cursor-pointer'>
                                            <h2 className='text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3'>
                                                Delivery Consultant
                                            </h2>
                                            <p className='text-xs sm:text-sm'>
                                                With our intuitive interface and robust features, you buy, sell.
                                            </p>
                                        </div>
                                    </div>

                                    <div className='text-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-[#f0f0ff] hover:bg-linear-to-br hover:from-[#5233b8] hover:to-[#7c5ce0] hover:text-white transition-all duration-300 cursor-pointer'>
                                        <h2 className='text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3'>
                                            Customized IT Strategy
                                        </h2>
                                        <p className='text-xs sm:text-sm'>
                                            Plus, our commitment to the security means that PayCoin.
                                        </p>
                                    </div>

                                    <div className='relative'>
                                        <img src="/images/left-bottom.png" alt=""
                                            className='absolute -bottom-3 sm:-bottom-4 md:-bottom-5 -right-8 sm:-right-12 md:-right-16 lg:-right-20 w-8 sm:w-12 md:w-16'
                                        />
                                        <span className='absolute -bottom-6 sm:-bottom-8 md:-bottom-10 right-4 sm:right-6 md:right-8 rounded-full bg-linear-to-br from-[#5233b8] to-[#7c5ce0] px-2 sm:px-3 py-1 sm:py-2 text-white text-sm sm:text-base transition-all duration-300'>
                                            02
                                        </span>
                                    </div>
                                </div>

                                {/* Center Column */}
                                <div className='flex items-center justify-center order-first lg:order-0'>
                                    <img src="/images/work-01.png" alt=""
                                        className='rounded-full w-48 sm:w-56 md:w-64 lg:w-72 h-auto'
                                    />
                                </div>

                                {/* Right Column */}
                                <div className='space-y-6 sm:space-y-8 md:mx-25 md:py-5'>
                                    <div className='relative'>
                                        <div className='relative'>
                                            <span className='absolute -top-6 sm:-top-8 md:-top-10 left-4 sm:left-6 md:left-8 rounded-full bg-linear-to-br from-[#5233b8] to-[#7c5ce0] px-2 sm:px-3 py-1 sm:py-2 text-white text-sm sm:text-base transition-all duration-300'>
                                                03
                                            </span>
                                            <img src="/images/right-top.png" alt=""
                                                className='absolute -top-3 sm:-top-4 md:-top-5 -left-8 sm:-left-12 md:-left-16 lg:-left-20 w-8 sm:w-12 md:w-16'
                                            />
                                        </div>

                                        <div className='text-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-[#f0f0ff] hover:bg-linear-to-br hover:from-[#5233b8] hover:to-[#7c5ce0] hover:text-white transition-all duration-300 cursor-pointer'>
                                            <h2 className='text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3'>
                                                Quality Assurance
                                            </h2>
                                            <p className='text-xs sm:text-sm'>
                                                Trusted partner in the world of crypto trading Join us today.
                                            </p>
                                        </div>
                                    </div>

                                    <div className='text-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-[#f0f0ff] hover:bg-linear-to-br hover:from-[#5233b8] hover:to-[#7c5ce0] hover:text-white transition-all duration-300 cursor-pointer'>
                                        <h2 className='text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3'>
                                            24/7 Support
                                        </h2>
                                        <p className='text-xs sm:text-sm'>
                                            Resources designed to help navigate best the dynamic
                                        </p>
                                    </div>

                                    <div className='relative'>
                                        <img src="/images/right-bottom.png" alt=""
                                            className='absolute -bottom-3 sm:-bottom-4 md:-bottom-5 -left-8 sm:-left-12 md:-left-16 lg:-left-20 w-8 sm:w-12 md:w-16'
                                        />
                                        <span className='absolute -bottom-6 sm:-bottom-8 md:-bottom-10 left-4 sm:left-6 md:left-8 rounded-full bg-linear-to-br from-[#5233b8] to-[#7c5ce0] px-2 sm:px-3 py-1 sm:py-2 text-white text-sm sm:text-base transition-all duration-300'>
                                            04
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/*  Case Studies Div || Sixth Div */}
                <div className='py-16 md:py-20 lg:mx-35'>
                    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='flex items-center gap-2 bg-[#f1f1f1] w-fit p-2 rounded-lg mb-6 sm:mb-8 md:mb-10'>
                            <span>
                                <MdThumbUp className='text-white bg-blue-700 rounded-full p-1 text-lg sm:text-xl md:text-2xl' />
                            </span>
                            <span className='text-blue-700 uppercase text-sm sm:text-base md:text-lg lg:text-xl'>
                                case Studies
                            </span>
                        </div>

                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-10'>
                            <h3 className='text-black font-semibold text-2xl sm:text-3xl'>
                                Our Latest Case Studies
                            </h3>
                            <div className='flex gap-3'>
                                <button className='swiper-button-prev-custom bg-gray-200 hover:text-white p-2 sm:p-3 rounded-full hover:bg-blue-800 transition-all'>
                                    <MdArrowOutward className='rotate-225 text-lg sm:text-xl' />
                                </button>
                                <button className='swiper-button-next-custom bg-gray-200 hover:text-white p-2 sm:p-3 rounded-full hover:bg-blue-800 transition-all'>
                                    <MdArrowOutward className='rotate-45 text-lg sm:text-xl' />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>




                {/* case study swiper */}
                <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 '>
                    {caseStudies.length > 0 ? (
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={20}
                            slidesPerView={1}
                            loop={true}
                            navigation={{
                                prevEl: '.swiper-button-prev-custom',
                                nextEl: '.swiper-button-next-custom',
                            }}
                            breakpoints={{
                                640: { slidesPerView: 1, spaceBetween: 20 },
                                768: { slidesPerView: 2, spaceBetween: 25 },
                                1024: { slidesPerView: 3, spaceBetween: 30 }
                            }}
                        >
                            {caseStudies.map((caseStudy) => {
                                const imageUrl = caseStudy.image && caseStudy.image.length > 0
                                    ? `http://localhost:5000/uploads/caseStudies/${caseStudy.image[0]}`
                                    : "/images/case-img1.png";

                                return (
                                    <SwiperSlide key={caseStudy.id || caseStudy._id}

                                    >
                                        <div className='relative'
                                            onClick={() => { navigate("/casestudy") }}
                                        >
                                            <div className='mb-4'>
                                                <img src={imageUrl} alt={caseStudy.title} className='w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg' />
                                            </div>

                                            <div className='relative -mt-8 sm:-mt-10 mx-2 sm:mx-4 bg-gray-100 p-4 sm:p-5 rounded-lg hover:bg-linear-to-br hover:from-[#5233b8] hover:to-[#7c5ce0] transition-all duration-300 group'>
                                                <div className='flex justify-between items-start mb-3'>
                                                    <span className='bg-blue-100 text-blue-700 group-hover:bg-white group-hover:text-black rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-sm transition-all duration-300'>
                                                        #{caseStudy.tag}
                                                    </span>
                                                    <MdArrowOutward className='bg-blue-100 text-blue-700 group-hover:bg-white group-hover:text-black rounded-full p-1 text-lg sm:text-xl transition-all duration-300' />
                                                </div>
                                                <h3 className='text-black group-hover:text-white font-semibold text-base sm:text-lg transition-all duration-300'>
                                                    {caseStudy.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    ) : (
                        <div className='text-center py-10 text-gray-500'>
                            No case studies available yet.
                        </div>
                    )}
                </div>



                {/* Testimonials Div || Seventh Div */}
                <div className='py-16 md:py-20 lg:mx-35'>
                    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='flex justify-center mb-6 sm:mb-8 md:mb-10'>
                            <div className='flex gap-2 items-center bg-[#f1f1f1] p-2 rounded-lg w-fit'>
                                <span className='bg-blue-600 text-white p-1 rounded-full'>
                                    <MdThumbUp className='text-sm sm:text-base' />
                                </span>
                                <span className='uppercase text-sm sm:text-base'>
                                    Testimonials
                                </span>
                            </div>
                        </div>

                        <div>
                            <h3 className='text-center text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-10'>
                                Experience the Difference<br className='hidden sm:block' />
                                Through Our Clients' Eyes
                            </h3>
                        </div>

                        <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 items-center'>
                            <div className='flex-1 w-full lg:w-1/2'>
                                <img src="/images/testimonial-img0.png" alt="Default testimonial"
                                    className='w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg' />
                            </div>

                            <div className='flex-1 w-full lg:w-1/2'>
                                {testimonials.length > 0 ? (
                                    <div className='relative'>
                                        <Swiper
                                            modules={[Navigation, Pagination]}
                                            spaceBetween={30}
                                            slidesPerView={1}
                                            direction='vertical'
                                            loop={true}
                                            height={400}
                                            style={{ height: '400px' }}
                                            navigation={{
                                                prevEl: '.testimonial-button-prev',
                                                nextEl: '.testimonial-button-next',
                                            }}
                                        >
                                            {testimonials.map((testimonial) => {
                                                const imageUrl = testimonial.image && testimonial.image.length > 0
                                                    ? `http://localhost:5000/uploads/testimonials/${testimonial.image[0]}`
                                                    : null;

                                                return (
                                                    <SwiperSlide key={testimonial.id || testimonial._id}>
                                                        <div className='space-y-4'>
                                                            <div className='bg-linear-to-r from-blue-800 to-blue-600 p-4 sm:p-6 rounded-lg text-white shadow-lg hover:shadow-xl transition-all lg:h-70   duration-300'>
                                                                <div className='flex items-center mb-4'>
                                                                    <div>
                                                                        <img
                                                                            src={imageUrl}
                                                                            alt={testimonial.user_name}
                                                                            className='w-12 sm:w-16 h-12 sm:h-16 rounded-full object-cover mr-4'
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <div className="flex items-center gap-2">
                                                                            <h4 className='font-semibold text-base sm:text-lg'>{testimonial.user_name}</h4>
                                                                            <img src="/images/quito1.svg" alt="" className='w-4 h-4' />
                                                                        </div>
                                                                        <p className='text-white text-xs sm:text-sm'>{testimonial.user_email}</p>
                                                                        <div className='flex text-yellow-400 mt-1'>
                                                                            {[...Array(5)].map((_, i) => (
                                                                                <span key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-white'}>★</span>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <p className='text-gray-white italic text-sm sm:text-base'>"{testimonial.message}"</p>
                                                            </div>

                                                            <div className='flex items-center justify-center'>
                                                                <img src="/images/testimonial-arrow-down.png" alt="" className='w-6 h-6' />
                                                            </div>

                                                            <div className='flex items-center justify-center gap-4'>
                                                                <div>
                                                                    <img
                                                                        src={imageUrl}
                                                                        alt={testimonial.user_name}
                                                                        className='w-8 sm:w-12 h-8 sm:h-12 rounded-full object-cover'
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <img src="/images/testimonial-img1.png" alt=""
                                                                        className='w-24 sm:w-32 h-auto rounded'
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                );
                                            })}
                                        </Swiper>

                                        <div className='absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-3 z-10'>
                                            <button className='testimonial-button-prev bg-gray-200 hover:text-white w-10 sm:w-12 h-10 sm:h-12 rounded-full hover:bg-blue-800 transition-all flex items-center justify-center cursor-pointer z-20'>
                                                <MdArrowOutward className='-rotate-45 text-sm sm:text-base' />
                                            </button>
                                            <button className='testimonial-button-next bg-gray-200 hover:text-white w-10 sm:w-12 h-10 sm:h-12 rounded-full hover:bg-blue-800 transition-all flex items-center justify-center cursor-pointer z-20'>
                                                <MdArrowOutward className='rotate-135 text-sm sm:text-base' />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='text-center py-10 text-gray-500'>
                                        No testimonials available yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                {/* Meet Our Team Div || Eighth Div */}
                <div className='py-16 md:py-20 lg:mx-35'>
                    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='flex justify-center mb-6 sm:mb-8 md:mb-10'>
                            <div className='flex items-center bg-[#e2e3fe] p-2 sm:p-3 gap-2 rounded-lg w-fit'>
                                <span className='text-lg sm:text-xl bg-blue-600 text-white rounded-full p-1'>
                                    <MdThumbUp />
                                </span>
                                <span className='text-blue-600 uppercase text-sm sm:text-base'>
                                    Meet Our Best Team
                                </span>
                            </div>
                        </div>

                        <div className='text-center mb-8 sm:mb-10 md:mb-12'>
                            <h3 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>
                                Meet Our Expert Team
                            </h3>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
                            {team.map((member) => {
                                return (
                                    <div key={member.id} className='relative group'>
                                        <div className='relative overflow-hidden rounded-lg'
                                            onClick={() => { navigate("/ourteam") }}
                                        >
                                            <img
                                                src={member.image ? `http://localhost:5000${member.image.url}` : "/images/default-avatar.png"}
                                                alt={member.name || 'Team member'}
                                                className='w-full h-64 sm:h-72 md:h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105'
                                            />

                                            {/* Social Links Overlay */}
                                            <div className='absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                                {member.links?.linkedin && (
                                                    <a href={member.links.linkedin} className='bg-white p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors'>
                                                        <LiaLinkedin className='w-5 h-5' />
                                                    </a>
                                                )}
                                                {member.links?.instagram && (
                                                    <a href={member.links.instagram} className='bg-white p-2 rounded-full hover:bg-pink-600 hover:text-white transition-colors'>
                                                        <BsInstagram className='w-5 h-5' />
                                                    </a>
                                                )}
                                                {member.links?.youtube && (
                                                    <a href={member.links.youtube} className='bg-white p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors'>
                                                        <BsYoutube className='w-5 h-5' />
                                                    </a>
                                                )}
                                                {member.links?.facebook && (
                                                    <a href={member.links.facebook} className='bg-white p-2 rounded-full hover:bg-blue-800 hover:text-white transition-colors'>
                                                        <FaFacebook className='w-5 h-5' />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Member Info Card */}
                                        <div className='absolute -bottom-6 left-4 right-4 bg-gray-100 p-4 rounded-lg shadow-lg flex items-center justify-between'>
                                            <div>
                                                <h3 className='text-base sm:text-lg font-bold text-gray-900'>
                                                    {member.name}
                                                </h3>
                                                <p className='text-sm sm:text-base font-semibold text-gray-600'>
                                                    {member.position}
                                                </p>
                                            </div>
                                            <div className='bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors cursor-pointer'>
                                                <FaShareNodes className='w-4 h-4 sm:w-5 sm:h-5' />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>



                {/* Our Blog Section || Ninth Div */}
                <div className='py-16 md:py-20 lg:mx-35'>
                    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='flex justify-center mb-6 sm:mb-8 md:mb-10'>
                            <div className='flex items-center bg-[#e2e3fe] p-2 sm:p-3 gap-2 rounded-lg w-fit'>
                                <span className='text-lg sm:text-xl bg-blue-600 text-white rounded-full p-1'>
                                    <MdThumbUp />
                                </span>
                                <span className='text-blue-600 uppercase text-sm sm:text-base'>
                                    Our Blog
                                </span>
                            </div>
                        </div>

                        <div className='text-center mb-8 sm:mb-10 md:mb-12'>
                            <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight'>
                                Stay Updated with the<br className='hidden sm:block' />
                                Latest in IT Solutions
                            </h3>
                        </div>

                        {/* blog loop */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10'>
                            {blogs.length > 0 ? blogs.slice(0, 2).map((blog) => {
                                const imageUrl = blog.images?.[0] ? `http://localhost:5000/uploads/blogImages/${blog.images[0]}` : 'images/default-blog.png';
                                const blogId = blog._id || blog.id;


                                return (
                                    <div key={blog.id} className='relative rounded-lg overflow-hidden shadow-lg group'>
                                        <div className='h-48 sm:h-56 md:h-64 lg:h-72'>
                                            <img src={imageUrl} alt={blog.title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
                                        </div>

                                        <div className='absolute bottom-0 left-0 right-0 bg-white p-3 sm:p-4 m-3 sm:m-4 rounded-lg'>
                                            <div className='flex gap-2 items-center mb-2 text-xs sm:text-sm text-gray-600'>
                                                <span className='font-semibold'>
                                                    {new Date(blog.created_at).toLocaleDateString('en-US', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                                <span>|</span>
                                                <span>{blog.author}</span>
                                            </div>

                                            <div className='absolute -top-2 sm:-top-3 -right-2 sm:-right-3'>
                                                <MdArrowOutward
                                                    className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] rounded-full text-white p-2 cursor-pointer hover:scale-110 transition-transform'
                                                    size={32}
                                                    onClick={() => navigate(`/blog/${blogId}`)}
                                                />
                                            </div>

                                            <h2 className='text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 hover:text-indigo-900 cursor-pointer line-clamp-2'
                                                onClick={() => window.location.href = '/'}
                                            >
                                                {blog.title}
                                            </h2>

                                            <p className='text-gray-600 text-xs sm:text-sm line-clamp-2'>
                                                {blog.content}
                                            </p>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div className='col-span-2 text-center py-10 text-gray-500'>
                                    No blogs available yet.
                                </div>
                            )}
                        </div>

                        <div className='flex justify-center'>
                            <Link to="/blogs">
                                <div className='flex items-center gap-2 sm:gap-3 bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] px-4 sm:px-6 py-2 sm:py-3 rounded-lg cursor-pointer hover:opacity-90 transition-opacity'>
                                    <span className='text-sm sm:text-base lg:text-lg text-white'>
                                        Read More Blogs And News
                                    </span>
                                    <MdArrowOutward className='text-white text-lg sm:text-xl lg:text-2xl' />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>



                {/* Message Div || TENTH DIV  */}
                <div className='relative bg-[url(/images/contact-bg2.png)] bg-cover bg-center bg-no-repeat py-12 sm:py-16 overflow-hidden bg-linear-to-r from-purple-900 via-indigo-900 to-purple-800 '>


                    <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
                        <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12'>
                            {/* Left Content */}
                            <div className='flex-1 text-white text-center lg:text-left'>
                                <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight'>
                                    Transform Your IT Today-<br className='hidden sm:block' />
                                    Speak with Our Experts!
                                </h2>

                                <p className='text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 opacity-90'>
                                    Ready to take your business to next level with cutting-edge IT<br className='hidden lg:block' />
                                    solutions? Our team is here to help you transform.
                                </p>

                                <div className='flex flex-col sm:flex-row max-w-md mx-auto lg:mx-0'>
                                    <input
                                        type="email"
                                        placeholder='Email Address'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-l-lg sm:rounded-l-lg rounded-r-lg sm:rounded-r-none bg-white text-gray-800 focus:outline-none text-sm sm:text-base mb-2 sm:mb-0'
                                    />
                                    <button
                                        onClick={handleSubscribe}
                                        className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] px-4 sm:px-6 py-2 sm:py-3 rounded-r-lg sm:rounded-r-lg rounded-l-lg sm:rounded-l-none flex items-center justify-center gap-2 text-white font-medium hover:opacity-90 transition-opacity text-sm sm:text-base'
                                    >
                                        Subscribe <MdArrowOutward />
                                    </button>
                                </div>
                            </div>

                            {/* Center Services */}
                            <div className='flex flex-col gap-3 sm:gap-4 order-last lg:order-0'>
                                <div className='flex items-center bg-white text-gray-800 px-3 sm:px-4 py-2 rounded-lg shadow-lg text-sm sm:text-base'>
                                    <MdOutlineDone className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white rounded-full p-1 mr-2 sm:mr-3 shrink-0' size={20} />
                                    IT Solution Services
                                </div>

                                <div className='flex items-center bg-white text-gray-800 px-3 sm:px-4 py-2 rounded-lg shadow-lg text-sm sm:text-base'>
                                    <MdOutlineDone className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white rounded-full p-1 mr-2 sm:mr-3 shrink-0' size={20} />
                                    Cyber Security Services
                                </div>

                                <div className='flex items-center bg-white text-gray-800 px-3 sm:px-4 py-2 rounded-lg shadow-lg text-sm sm:text-base'>
                                    <MdOutlineDone className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white rounded-full p-1 mr-2 sm:mr-3 shrink-0' size={20} />
                                    Software Development
                                </div>
                            </div>

                            {/* Right Image */}
                            <div className='relative shrink-0 order-first lg:order-last'>
                                <img
                                    src="/images/contact-img1.png"
                                    alt="Professional woman with tablet"
                                    className='h-48 sm:h-56 md:h-64 lg:h-80 w-auto object-contain'
                                />

                                <img src="/images/contact-bg-bg2.png" alt=""
                                    className='absolute top-0 right-5 opacity-70 animate-[spin_15s_linear_infinite] lg:w-50 sm:w-20 md:w-24'
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Homepage