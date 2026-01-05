import React, { useEffect, useState } from 'react'

import "../App.css"
import { FaFacebook } from "react-icons/fa";
import { MdArrowOutward, MdOutlineDone, MdThumbUp } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { LiaLinkedin } from 'react-icons/lia';
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
import Breadcrumb from '../components/BreadCrumb.jsx';

function AboutUs() {

    const [services, setServices] = useState([]);
    const [team, setTeam] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [email, setEmail] = useState('');




    useEffect(() => {

        const fetchServices = async () => {
            try {
                const response = await serviceAPI.getServices();
                setServices(response.data);

            } catch (error) {
                console.log("Error While Fetching Services", error);
                setServices([]);
            }
        }

        const fetchTeam = async () => {

            try {
                const response = await teamAPI.getTeamMembers();
                // console.log('Team response:', response.data);
                setTeam(response.data.filter(member => member.status === 'active'));

            } catch (error) {
                console.log(" 'Error fetching team members: ", error);

            }
        }

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


        fetchServices();
        fetchTeam();
        fetchTestimonials();

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


            <div className='mx-auto '>


                <div                >
                    <Breadcrumb />
                </div>

                <div className='mx-4 sm:mx-8 lg:mx-16 xl:mx-35'>

                    {/* Best IT Solution  */}

                    <div className=''>

                        <div className='flex flex-col lg:flex-row mt-10 lg:mt-20 gap-8 lg:gap-0'>

                            {/* left side */}
                            <div className='flex-1 lg:pr-8'>
                                <div>
                                    <span className='inline-flex items-center gap-2 uppercase text-sm sm:text-base lg:text-xl font-semibold text-[#3411a1] bg-[#f1f1ff] rounded-lg p-2 max-w-fit'>
                                        <MdThumbUp className='bg-blue-300 p-1 text-xl sm:text-2xl rounded-full shrink-0' />
                                        <span className='whitespace-nowrap'>Best IT solution</span>
                                    </span>

                                    <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mt-5'>
                                        End-to-End IT Solutions for <br className='hidden sm:block' />
                                        Growing Businesses
                                    </h2>

                                    <p className='mt-5 leading-relaxed text-sm sm:text-base text-gray-700'>
                                        We provide comprehensive, end-to-end IT solutions designed to support <br className='hidden lg:block' /> businesses at every stage of growth.
                                    </p>

                                    <div className='mt-6 bg-[#d4e7fb] w-full p-4 sm:p-5 rounded-lg'>
                                        <div className='mb-4'>
                                            <div className='flex justify-between items-center mb-1'>
                                                <p className='text-sm sm:text-base font-medium'>IT Solution</p>
                                                <span className='text-xs sm:text-sm text-gray-600'>95%</span>
                                            </div>
                                            <progress
                                                className='w-full h-2 [&::-webkit-progress-value]:bg-blue-800 [&::-moz-progress-bar]:bg-blue-600 rounded-full overflow-hidden'
                                                value={95} max={100} />
                                        </div>

                                        <div className='mb-4'>
                                            <div className='flex justify-between items-center mb-1'>
                                                <p className='text-sm sm:text-base font-medium'>Cyber Security</p>
                                                <span className='text-xs sm:text-sm text-gray-600'>99%</span>
                                            </div>
                                            <progress
                                                className='w-full h-2 [&::-webkit-progress-value]:bg-blue-800 [&::-moz-progress-bar]:bg-blue-600 rounded-full overflow-hidden'
                                                value={99} max={100} />
                                        </div>

                                        <div className='mb-2'>
                                            <div className='flex justify-between items-center mb-1'>
                                                <p className='text-sm sm:text-base font-medium'>Cloud Solution</p>
                                                <span className='text-xs sm:text-sm text-gray-600'>99%</span>
                                            </div>
                                            <progress
                                                className='w-full h-2 [&::-webkit-progress-value]:bg-blue-800 [&::-moz-progress-bar]:bg-blue-600 rounded-full overflow-hidden'
                                                value={99} max={100} />
                                        </div>
                                    </div>

                                    <div className='mt-8'>
                                        <Link to="/ourservices">
                                            <button className='inline-flex bg-linear-to-r from-blue-800 to-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg items-center gap-2 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 text-sm sm:text-base'>
                                                <span>Discover Our Solutions</span>
                                                <MdArrowOutward className='text-lg' />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Right side */}
                            <div className='flex-1 relative mt-8 lg:mt-0'>



                                <div className='hidden lg:block sm:hidden'>
                                    <img src="images/about-left-top.png" alt=""
                                        className='absolute z-10 right-20 top-0 w-16 lg:w-auto'
                                    />
                                </div>

                                <div className='hidden lg:block'>
                                    <img src="images/about-bg-bg-left.png" alt=""
                                        className='absolute z-10 rotate-180 right-0 top-10 h-64 lg:h-170'
                                    />

                                </div>


                                <div>
                                    <img src="images/best-img1.png" alt=""
                                        className='lg:z-20 sm:z-0 absolute right-8 lg:right-16 top-8 lg:top-15 w-32 sm:w-48 lg:w-auto sm:hidden'
                                    />
                                </div>

                                <div>
                                    <img src="images/best-img2.png" alt=""
                                        className='lg:z-30 sm:z-0 absolute top-32 sm:top-48 lg:top-70 left-0 lg:left-20 w-32 sm:w-48 lg:w-auto sm:hidden'
                                    />

                                </div>






                            </div>


                        </div>


                    </div>


                    {/* About us div  */}
                    <div className=' py-16 md:py-24 relative overflow-hidden'>
                        {/* Background decorative images */}
                        <img src="images/about-bg-bg-left.png" alt="" className='absolute left-0 top-0 h-full w-auto opacity-30 z-0' />
                        <img src="images/about-left-top.png" alt="" className='absolute top-16 left-8 w-24 md:w-32 opacity-60 z-0' />

                        <div className='container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 relative z-10'>
                            {/* Left Content - Images */}
                            <div className='flex-1 relative'>
                                {/* Floating badge */}
                                <div className='absolute top-8 right-8 lg:top-16 lg:right-16 bg-white p-4 rounded-lg shadow-lg z-20 animate-[bounce_10s_linear_infinite] max-w-xs'>
                                    <div className='flex items-center gap-3'>
                                        <div className='bg-blue-800 rounded-full p-2 shrink-0'>
                                            <MdDone className='text-white text-xl' />
                                        </div>
                                        <div>
                                            <p className='text-black text-sm md:text-base font-medium'>
                                                With 15+ years of experience<br />
                                                IT solution help community.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Image grid */}
                                <div className='flex gap-4 items-end'>
                                    <div className='flex-1'>
                                        <img src="images/about-img1.png" alt="" className='w-full h-auto rounded-lg' />
                                    </div>
                                    <div className='flex-1 space-y-4'>
                                        <img src="images/about-img2.png" alt="" className='w-full h-auto rounded-lg' />
                                        <img src="images/about-img3.png" alt="" className='w-full h-auto rounded-lg' />
                                    </div>
                                </div>
                            </div>

                            {/* Right Content - Text */}
                            <div className='flex-1 max-w-2xl'>


                                <div className='flex items-center gap-2 sm:gap-3 bg-[#f2f2ff] p-2 sm:p-3 rounded-lg mb-6 max-w-fit'>
                                    <BiSolidLike className='bg-[#472dba] text-white rounded-full p-1 text-xl' />
                                    <span className='text-[#472dba] uppercase font-semibold text-xs sm:text-sm md:text-base'>
                                        About Eitech IT Solution
                                    </span>
                                </div>

                                <div className='mb-6'>
                                    <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight'>
                                        Unlock Business<br className='hidden sm:block' />
                                        Potential with Tailored<br className='hidden sm:block' />
                                        IT Services
                                    </h2>
                                </div>

                                <div className='mb-8'>
                                    <p className='text-[#7e779d] text-base md:text-lg leading-relaxed'>
                                        At Eitech, we understand that every business unique, which is why we offer customized IT solutions designed to meet.
                                    </p>
                                </div>

                                <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 mb-8'>

                                    {/* Left */}
                                    <div className='flex items-center'>

                                        <div className="w-16 sm:w-20 lg:w-24">
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
                                        <div className='text-sm sm:text-lg lg:text-xl ml-2 mt-2 lg:mt-4'>
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
                                        <div className='flex items-center'>

                                            <div className="w-16 sm:w-20 lg:w-24">
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
                                            <div className='text-sm sm:text-lg lg:text-xl ml-2 mt-2 lg:mt-4'>
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



                    {/* Our Vision/Mission */}

                    <div className='flex flex-col lg:flex-row gap-8 lg:gap-0 mb-10 lg:mb-20'>

                        <div className='flex-1 lg:pr-8'>
                            <span className='flex items-center gap-2 bg-[#f1f1ff] max-w-fit p-2 rounded-lg'>
                                <MdThumbUp className='rounded-full text-2xl sm:text-3xl bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white p-1' />
                                <p className='text-xs sm:text-sm uppercase font-semibold bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] bg-clip-text text-transparent'>
                                    Our Vision/Mission
                                </p>
                            </span>

                            <div>
                                <h3 className='text-xl sm:text-2xl lg:text-4xl xl:text-5xl mt-5 font-semibold'>
                                    Driving Innovation: Our <br className='hidden sm:block' />
                                    Mission Vision at Eitech
                                </h3>

                                <p className='text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 mt-2'>
                                    At the of innovation, our cutting-edge IT solutions are designed <br className='hidden lg:block' />
                                    transform your business ETech operations.
                                </p>

                                <div className='mt-4'>
                                    {Array.isArray(services) && services.length > 0 && services.slice(0, 2).map((service, index) => {
                                        const serviceId = service.id || service._id;
                                        const imageSrc = service.icon ? `http://localhost:5000/uploads/serviceIcons/${service.icon}` : null;

                                        return (
                                            <div key={serviceId} className='flex bg-white gap-3 sm:gap-4 p-3 sm:p-4 mb-4 rounded-lg shadow-sm'>
                                                <div className='flex-shrink-0'>
                                                    <img
                                                        src={imageSrc}
                                                        alt={service.title}
                                                        className='w-12 h-12 sm:w-16 sm:h-16 rounded-full p-2 bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] object-cover'
                                                        onError={(e) => {
                                                            console.log('Image failed to load:', imageSrc);
                                                        }}
                                                    />
                                                </div>
                                                <div className='flex-1 min-w-0'>
                                                    <h2 className='text-base sm:text-lg lg:text-xl font-semibold'>{service.title}</h2>
                                                    <p className='text-sm sm:text-base text-gray-500 line-clamp-2'>{service.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className='mt-6'>
                                    <Link to="/contactus">
                                        <span className='inline-flex items-center gap-2 text-white bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] rounded-lg px-4 py-3 cursor-pointer hover:opacity-90 transition-opacity text-sm sm:text-base'>
                                            <span>See How We can Help</span>
                                            <MdArrowOutward className='text-lg sm:text-xl' />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className='flex-1 mt-8 lg:mt-0'>
                            <div className='relative'>
                                <img src="images/our-mission-bg-design.png" alt=""
                                    className='absolute w-20 sm:w-32 lg:w-50 -bottom-10 sm:-bottom-15 lg:-bottom-25 right-5 sm:right-10 lg:right-15 z-5'
                                />

                                <div className='relative z-10'>
                                    <img src="images/our-mission-01.png" alt="" className='w-full h-auto' />
                                </div>

                                <div className='flex gap-2 sm:gap-3 mt-3 sm:mt-5 relative z-10'>
                                    <div className='flex-1'>
                                        <img src="images/our-mission-02.png" alt="" className='w-full h-auto' />
                                    </div>
                                    <div className='flex-1'>
                                        <img src="images/our-mission-03.png" alt="" className='w-full h-auto' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Meet Our Team Div || Eighth Div */}
                    <div className='mb-20 sm:mb-32 lg:mb-40'>
                        <div className='flex mx-auto items-center bg-[#e2e3fe] p-2 sm:p-3 max-w-fit gap-2 rounded-lg mb-6 sm:mb-10 justify-center'>
                            <span className='text-lg sm:text-xl bg-blue-600 text-white rounded-full p-1'>
                                <MdThumbUp />
                            </span>
                            <span className='text-blue-600 uppercase text-sm sm:text-base font-semibold'>
                                Meet Our Best Team
                            </span>
                        </div>

                        <div className='text-center mb-8 sm:mb-12'>
                            <h3 className='text-2xl sm:text-3xl lg:text-4xl font-semibold'>
                                Meet Our Expert Team
                            </h3>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                            {team.map((member) => {
                                return (
                                    <div key={member.id} className='relative group'>
                                        <div className='relative overflow-hidden rounded-lg'>
                                            <img
                                                src={member.image ? `http://localhost:5000${member.image.url}` : "images/default-avatar.png"}
                                                alt={member.name || 'Team member'}
                                                className='w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105'
                                            />

                                            {/* Social Links */}
                                            <div className='absolute top-4 right-4 hidden group-hover:flex flex-col gap-2 transition-all duration-300'>
                                                {member.links?.linkedin && (
                                                    <a href={member.links.linkedin} className='transform hover:scale-110 transition-transform'>
                                                        <LiaLinkedin className='p-2 bg-white h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-blue-600 hover:text-white transition-colors' />
                                                    </a>
                                                )}
                                                {member.links?.instagram && (
                                                    <a href={member.links.instagram} className='transform hover:scale-110 transition-transform'>
                                                        <BsInstagram className='p-2 bg-white h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-pink-600 hover:text-white transition-colors' />
                                                    </a>
                                                )}
                                                {member.links?.youtube && (
                                                    <a href={member.links.youtube} className='transform hover:scale-110 transition-transform'>
                                                        <BsYoutube className='p-2 bg-white h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-red-600 hover:text-white transition-colors' />
                                                    </a>
                                                )}
                                                {member.links?.facebook && (
                                                    <a href={member.links.facebook} className='transform hover:scale-110 transition-transform'>
                                                        <FaFacebook className='p-2 bg-white h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-blue-800 hover:text-white transition-colors' />
                                                    </a>
                                                )}
                                            </div>

                                            {/* Member Info */}
                                            <div className='absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-lg'>
                                                <div className='flex justify-between items-center'>
                                                    <div className='flex-1 min-w-0'>
                                                        <h3 className='text-sm sm:text-base lg:text-lg font-bold truncate'>
                                                            {member.name}
                                                        </h3>
                                                        <p className='text-xs sm:text-sm lg:text-base font-semibold text-gray-600 truncate'>
                                                            {member.position}
                                                        </p>
                                                    </div>
                                                    <div className='bg-blue-500 text-white rounded-full p-1 sm:p-2 flex-shrink-0 ml-2'>
                                                        <FaShareNodes className='h-4 w-4 sm:h-5 sm:w-5' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Testimonials Div || Seventh Div */}
                    <div className='mb-16 sm:mb-20 lg:mb-24'>
                        <div className='flex gap-2 bg-[#f1f1f1] items-center p-2 sm:p-3 rounded-lg max-w-fit mb-6 sm:mb-10'>
                            <span className='bg-blue-600 text-white p-1 rounded-full'>
                                <MdThumbUp />
                            </span>
                            <span className='uppercase text-sm sm:text-base font-semibold'>
                                Testimonials
                            </span>
                        </div>

                        <div className='text-center mb-6 sm:mb-8 lg:mb-12'>
                            <h3 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight px-4'>
                                Experience the Difference <br className='hidden sm:block' />
                                Through Our Clients' Eyes
                            </h3>
                        </div>

                        <div className='space-y-6 lg:space-y-0 lg:flex lg:gap-8 lg:items-start'>
                            <div className='w-full lg:flex-1 lg:order-2'>
                                {testimonials.length > 0 ? (
                                    <div className='relative'>
                                        <Swiper
                                            modules={[Navigation, Pagination]}
                                            spaceBetween={20}
                                            slidesPerView={1}
                                            loop={true}
                                            navigation={{
                                                prevEl: '.testimonial-button-prev',
                                                nextEl: '.testimonial-button-next',
                                            }}
                                            className='pb-4'
                                        >
                                            {testimonials.map((testimonial) => {
                                                const imageUrl = testimonial.image && testimonial.image.length > 0
                                                    ? `http://localhost:5000/uploads/testimonials/${testimonial.image[0]}`
                                                    : null;

                                                return (
                                                    <SwiperSlide key={testimonial.id || testimonial._id}>
                                                        <div className='px-2 sm:px-4'>
                                                            <div className='bg-linear-to-r from-blue-800 to-blue-600 p-4 sm:p-6 rounded-lg text-white shadow-lg mb-4'>
                                                                <div className='flex items-start gap-3 mb-4'>
                                                                    <img
                                                                        src={imageUrl || 'images/default-avatar.png'}
                                                                        alt={testimonial.user_name}
                                                                        className='w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0'
                                                                    />
                                                                    <div className='flex-1 min-w-0'>
                                                                        <div className="flex items-center gap-2 mb-1">
                                                                            <h4 className='font-semibold text-sm sm:text-base truncate'>{testimonial.user_name}</h4>
                                                                            <img src="images/quito1.svg" alt="" className='w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0' />
                                                                        </div>
                                                                        <p className='text-white/80 text-xs truncate'>{testimonial.user_email}</p>
                                                                        <div className='flex text-yellow-400 mt-1'>
                                                                            {[...Array(5)].map((_, i) => (
                                                                                <span key={i} className={`text-xs sm:text-sm ${i < testimonial.rating ? 'text-yellow-400' : 'text-white/50'}`}>★</span>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <p className='text-white/90 italic text-sm sm:text-base sm:line-clamp-3 leading-relaxed'>"{testimonial.message}"</p>
                                                            </div>

                                                            <div className='flex items-center justify-center gap-3 sm:gap-4 px-2'>
                                                                <img src="images/testimonial-arrow-down.png" alt="" className='w-4 h-4 sm:w-6 sm:h-6 md:rotate-27 sm:rotate-27' />
                                                                <div className='flex items-center gap-3 sm:gap-4'>
                                                                    <img
                                                                        src={imageUrl || 'images/default-avatar.png'}
                                                                        alt={testimonial.user_name}
                                                                        className='w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover'
                                                                    />
                                                                    <img src="images/testimonial-img1.png" alt="" className='lg:w-30 md:w-70 h-12 sm:w-30 sm:h-20 rounded' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                );
                                            })}
                                        </Swiper>

                                        <div className='flex justify-center gap-3 mt-4 sm:mt-6'>
                                            <button className='testimonial-button-prev bg-gray-200 hover:text-white w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full hover:bg-blue-800 transition-all flex items-center justify-center cursor-pointer'>
                                                <MdArrowOutward className='-rotate-45 text-sm sm:text-base lg:text-lg' />
                                            </button>
                                            <button className='testimonial-button-next bg-gray-200 hover:text-white w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full hover:bg-blue-800 transition-all flex items-center justify-center cursor-pointer'>
                                                <MdArrowOutward className='rotate-135 text-sm sm:text-base lg:text-lg' />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='text-center py-8 sm:py-10 text-gray-500'>
                                        <p className='text-sm sm:text-base'>No testimonials available yet.</p>
                                    </div>
                                )}
                            </div>

                            <div className='flex justify-center lg:flex-1 lg:order-1 lg:justify-start'>
                                <div className='w-full max-w-xs sm:max-w-sm lg:max-w-none'>
                                    <img src="images/testimonial-img0.png" alt="Default testimonial"
                                        className='w-full h-auto object-contain rounded-lg' />
                                </div>
                            </div>
                        </div>
                    </div>







                </div>


            </div>


            {/* Message Div || TENTH DIV  */}
            <div className='relative bg-[url(images/contact-bg2.png)] bg-cover bg-center bg-no-repeat py-12 sm:py-16 lg:py-20 px-4 sm:px-8 overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800'>
                <div className='container mx-auto'>
                    <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12'>
                        {/* Left Content */}
                        <div className='flex-1 text-white text-center lg:text-left max-w-2xl'>
                            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight'>
                                Transform Your IT Today-<br className='hidden sm:block' />
                                Speak with Our Experts!
                            </h2>

                            <p className='text-base sm:text-lg mb-6 sm:mb-8 opacity-90 leading-relaxed'>
                                Ready to take your business to the next level with cutting-edge IT<br className='hidden lg:block' />
                                solutions? Our team is here to help you transform.
                            </p>

                            <div className='flex flex-col sm:flex-row max-w-md mx-auto lg:mx-0 gap-2 sm:gap-0'>
                                <input
                                    type="email"
                                    placeholder='Email Address'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='flex-1 px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-white text-gray-800 focus:outline-none text-sm sm:text-base'
                                />
                                <button
                                    onClick={handleSubscribe}
                                    className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] px-4 sm:px-6 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg flex items-center justify-center gap-2 text-white font-medium hover:opacity-90 transition-opacity text-sm sm:text-base'
                                >
                                    Subscribe <MdArrowOutward />
                                </button>
                            </div>
                        </div>

                        {/* Center Services - Hidden on mobile */}
                        <div className='hidden lg:flex flex-col gap-4 animate-[bounce_3s_ease-in-out_infinite]'>
                            <div className='flex items-center bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm lg:text-base'>
                                <MdOutlineDone className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white rounded-full p-1 mr-3 flex-shrink-0' size={20} />
                                IT Solution Services
                            </div>
                            <div className='flex items-center bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm lg:text-base'>
                                <MdOutlineDone className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white rounded-full p-1 mr-3 flex-shrink-0' size={20} />
                                Cyber Security Services
                            </div>
                            <div className='flex items-center bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm lg:text-base'>
                                <MdOutlineDone className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white rounded-full p-1 mr-3 flex-shrink-0' size={20} />
                                Software Development
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className='relative flex-shrink-0 max-w-xs sm:max-w-sm lg:max-w-none'>
                            <img
                                src="/images/contact-img1.png"
                                alt="Professional woman with tablet"
                                className='h-48 sm:h-64 lg:h-80 w-auto object-contain mx-auto'
                            />
                            <img src="images/contact-bg-bg2.png" alt=""
                                className='absolute top-0 left-1/2 transform -translate-x-1/2 opacity-50 animate-[spin_15s_linear_infinite] w-32 sm:w-40 lg:w-auto'
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AboutUs
