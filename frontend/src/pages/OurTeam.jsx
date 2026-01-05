import React, { useState, useEffect } from 'react'
import "../App.css"
import { FaFacebook, } from "react-icons/fa";
import { MdArrowOutward, MdOutlineDone, MdThumbUp } from "react-icons/md";

import { MdDone } from "react-icons/md";
import { LiaLinkedin } from 'react-icons/lia';
import { BiSolidLike } from 'react-icons/bi';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { teamAPI, contactAPI } from '../../utils/api.js';
import { Link } from 'react-router-dom';

import { FaShareNodes } from "react-icons/fa6";




import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BsInstagram, BsYoutube } from 'react-icons/bs';
import Breadcrumb from '../components/BreadCrumb.jsx';




function OurTeam() {


    const [team, setTeam] = useState([]);

    const [email, setEmail] = useState('');



    useEffect(() => {




        const fetchTeam = async () => {

            try {
                const response = await teamAPI.getTeamMembers();
                // console.log('Team response:', response.data);
                setTeam(response.data.filter(member => member.status === 'active'));

            } catch (error) {
                console.log(" 'Error fetching team members: ", error);

            }
        }





        fetchTeam();


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
            <div>

                <Breadcrumb />

            </div>


            <div className='mt-10 '>



                {/* Meet Our Team Div || Eighth Div */}

                <div className='mx-4 sm:mx-8 lg:mx-16 xl:mx-35 mb-20 lg:mb-40'>

                    <div className='flex mx-auto items-center bg-[#e2e3fe] p-2 max-w-fit gap-2 rounded-lg mb-10 justify-center'>

                        <span className='text-xl bg-blue-600 text-white rounded-full p-1 '>
                            <MdThumbUp />
                        </span>

                        <span className='text-blue-600 uppercase'>
                            Meet Our Best Team
                        </span>

                    </div>

                    <div className='' >

                        <h3 className='text-center mb-10 items-center text-2xl sm:text-3xl lg:text-4xl font-semibold'>
                            Meet Our Expert Team
                        </h3>

                    </div>


                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>


                        {team.map((member) => {
                            // console.log('Team member:', member);
                            // console.log('Member image:', member.image);
                            return (
                                <div key={member.id} className='relative'>
                                    <div className='group relative'>

                                        <div>
                                            <img
                                                src={member.image ? `http://localhost:5000${member.image.url}` : "images/default-avatar.png"}
                                                alt={member.name || 'Team member'}
                                                className='w-full h-48 sm:h-56 lg:h-64 object-cover rounded'

                                            />
                                        </div>

                                        <div className='absolute top-4 right-4 hidden group-hover:flex flex-col gap-2 transition-all duration-300'>

                                            {member.links?.linkedin && (
                                                <a href={member.links.linkedin}>
                                                    <LiaLinkedin
                                                        className='p-2 bg-white h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-blue-600 hover:text-white transition-colors'
                                                    />
                                                </a>
                                            )}

                                            {member.links?.instagram && (
                                                <a href={member.links.instagram} >
                                                    <BsInstagram
                                                        className='p-2 bg-white h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-pink-600 hover:text-white transition-colors'
                                                    />
                                                </a>
                                            )}

                                            {member.links?.youtube && (
                                                <a href={member.links.youtube}>
                                                    <BsYoutube
                                                        className='p-2 bg-white h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-red-600 hover:text-white transition-colors'

                                                    />
                                                </a>
                                            )}

                                            {member.links?.facebook && (
                                                <a href={member.links.facebook}>
                                                    <FaFacebook
                                                        className='p-2 bg-white h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-blue-800 hover:text-white transition-colors'

                                                    />
                                                </a>
                                            )}

                                        </div>

                                    </div>

                                    <div className='absolute -bottom-6 left-4 right-4 flex justify-between items-center bg-gray-100 p-3 sm:p-4 rounded-lg shadow-lg'>

                                        <div>

                                            <h3 className='text-sm sm:text-base lg:text-lg font-bold'>
                                                {member.name}
                                            </h3>

                                            <p
                                                className='text-xs sm:text-sm lg:text-base font-semibold text-gray-600'
                                            >
                                                {member.position}
                                            </p>

                                        </div>


                                        <div className='bg-blue-500 text-white rounded-full p-1 sm:p-2'>

                                            <FaShareNodes
                                                className='h-4 w-4 sm:h-6 sm:w-6'
                                            />

                                        </div>

                                    </div>
                                </div>
                            );
                        })}


                    </div>


                </div>


                {/* About us div || Second Div */}
                <div className='mx-4 sm:mx-8 lg:mx-16 xl:mx-35 py-8 sm:py-12 lg:py-16 xl:py-24 relative overflow-hidden'>
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


                            <div className='flex items-center gap-3 bg-[#f2f2ff] p-3 rounded-lg mb-6 max-w-fit'>
                                <BiSolidLike className='bg-[#472dba] text-white rounded-full p-1 text-xl' />
                                <span className='text-[#472dba] uppercase font-semibold text-sm md:text-base'>
                                    About Eitech IT Solution
                                </span>
                            </div>

                            <div className='mb-6'>
                                <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight'>
                                    Unlock Business<br />
                                    Potential with Tailored<br />
                                    IT Services
                                </h2>
                            </div>

                            <div className='mb-8'>
                                <p className='text-[#7e779d] text-base md:text-lg leading-relaxed'>
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



            </div>

            {/* Message Div || TENTH DIV  */}
            <div className='relative bg-[url(images/contact-bg2.png)] bg-cover bg-center bg-no-repeat py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800'>
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

export default OurTeam
