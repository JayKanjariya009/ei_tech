import React, { useState } from 'react'
import { BiPhone } from 'react-icons/bi'
import { BsMailbox } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa6'
import { MdMail } from 'react-icons/md'
import { RiGlobalFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'

function Footer() {
    const [openDropdown, setOpenDropdown] = useState(null)

    const toggleDropdown = (section) => {
        setOpenDropdown(openDropdown === section ? null : section)
    }

    return (
        <>
            <div className='bg-gray-50 py-8 md:py-16 px-4 md:px-8'>
                <div className='container mx-auto max-w-6xl'>
                    <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-20'>

                        <div className='lg:flex-1 lg:max-w-xs mb-8 lg:mb-0'>
                            <img src="images/logo2.png" alt=""
                                className='w-24 md:w-32 mb-4'
                            />

                            <p className='text-gray-600 leading-relaxed mb-6 text-sm md:text-base'>
                                We provide expert best services <br className='hidden md:block' />
                                technology to meet your unique <br className='hidden md:block' />
                                needs. Whether you're looking.
                            </p>

                            <div>
                                <ul className='flex gap-2 md:gap-3'>
                                    <li className='bg-[#eff1ff] hover:bg-linear-to-r hover:from-[#300B9BFF] hover:to-[#665CEAFF] hover:text-white p-2 md:p-3 rounded-full transition-all duration-300 cursor-pointer'>
                                        <FaFacebook className='text-sm md:text-base' />
                                    </li>
                                    <li className='bg-[#eff1ff] hover:bg-linear-to-r hover:from-[#300B9BFF] hover:to-[#665CEAFF] hover:text-white p-2 md:p-3 rounded-full transition-all duration-300 cursor-pointer'>
                                        <FaInstagram className='text-sm md:text-base' />
                                    </li>
                                    <li className='bg-[#eff1ff] hover:bg-linear-to-r hover:from-[#300B9BFF] hover:to-[#665CEAFF] hover:text-white p-2 md:p-3 rounded-full transition-all duration-300 cursor-pointer'>
                                        <FaLinkedin className='text-sm md:text-base' />
                                    </li>
                                    <li className='bg-[#eff1ff] hover:bg-linear-to-r hover:from-[#300B9BFF] hover:to-[#665CEAFF] hover:text-white p-2 md:p-3 rounded-full transition-all duration-300 cursor-pointer'>
                                        <FaYoutube className='text-sm md:text-base' />
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className='lg:flex-1 mb-6 lg:mb-0'>
                            <div className='lg:hidden'>
                                <button 
                                    onClick={() => toggleDropdown('quickLinks')}
                                    className='flex items-center justify-between w-full text-lg md:text-xl font-semibold mb-2 text-gray-800 py-2'
                                >
                                    Quick Links
                                    {openDropdown === 'quickLinks' ? <IoChevronUp /> : <IoChevronDown />}
                                </button>
                                <ul className={`space-y-2 overflow-hidden transition-all duration-300 ${openDropdown === 'quickLinks' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors text-sm md:text-base'><Link to="/aboutus">About Us</Link></li>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors text-sm md:text-base'><Link to="/ourservices">It Solution</Link></li>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors text-sm md:text-base'><Link to="/blogs">Our Blog</Link></li>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors text-sm md:text-base'><Link to="/ourservices">Pricing Plan</Link></li>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors text-sm md:text-base'><Link to="/contactus">Contact Us</Link></li>
                                </ul>
                            </div>
                            <div className='hidden lg:block'>
                                <h2 className='text-xl font-semibold mb-4 text-gray-800'>
                                    Quick Links
                                </h2>
                                <ul className='space-y-2'>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors'><Link to="/aboutus">About Us</Link></li>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors'><Link to="/ourservices">It Solution</Link></li>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors'><Link to="/blogs">Our Blog</Link></li>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors'><Link to="/ourservices">Pricing Plan</Link></li>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors'><Link to="/contactus">Contact Us</Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Our Services */}
                        <div className='lg:flex-1 mb-6 lg:mb-0'>
                            <div className='lg:hidden'>
                                <button 
                                    onClick={() => toggleDropdown('services')}
                                    className='flex items-center justify-between w-full text-lg md:text-xl font-semibold mb-2 text-gray-800 py-2'
                                >
                                    Our Services
                                    {openDropdown === 'services' ? <IoChevronUp /> : <IoChevronDown />}
                                </button>
                                <ul className={`space-y-2 overflow-hidden transition-all duration-300 ${openDropdown === 'services' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors text-sm md:text-base'>
                                        <Link to='/ourservices'>Cyber Security Solution</Link>
                                    </li>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors text-sm md:text-base'>
                                        <Link to='/ourservices'>Scalable Cloud Solutions</Link>
                                    </li>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors text-sm md:text-base'>
                                        <Link to='/ourservices'>Data Protection Services</Link>
                                    </li>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors text-sm md:text-base'>
                                        <Link to='/ourservices'>Optimization Management</Link>
                                    </li>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors text-sm md:text-base'>
                                        <Link to='/ourservices'>Software Development</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='hidden lg:block'>
                                <h2 className='text-xl font-semibold mb-4 text-gray-800'>Our Services</h2>
                                <ul className='space-y-2'>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors'>
                                        <Link to='/ourservices'>Cyber Security Solution</Link>
                                    </li>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors'>
                                        <Link to='/ourservices'>Scalable Cloud Solutions</Link>
                                    </li>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors'>
                                        <Link to='/ourservices'>Data Protection Services</Link>
                                    </li>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors'>
                                        <Link to='/ourservices'>Optimization Management</Link>
                                    </li>
                                    <li className='text-gray-600 hover:text-blue-600 cursor-pointer transition-colors'>
                                        <Link to='/ourservices'>Software Development</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact us */}
                        <div className='lg:flex-1'>
                            <div className='lg:hidden'>
                                <button 
                                    onClick={() => toggleDropdown('contact')}
                                    className='flex items-center justify-between w-full text-lg md:text-xl font-semibold mb-2 text-gray-800 py-2'
                                >
                                    Contact Us
                                    {openDropdown === 'contact' ? <IoChevronUp /> : <IoChevronDown />}
                                </button>
                                <ul className={`space-y-3 overflow-hidden transition-all duration-300 ${openDropdown === 'contact' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <li className='flex items-center gap-3'>
                                        <a href="tel:+1234567890" className='flex items-center gap-3'>
                                            <BiPhone className='text-gray-600 text-base md:text-lg' />
                                            <p className='text-gray-600 text-sm md:text-base'>+91 1234567890</p>
                                        </a>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <CiLocationOn className='text-gray-600 text-base md:text-lg' />
                                        <p className='text-gray-600 text-sm md:text-base'>421 Allen, Mexico 4233</p>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <a href="mailto:abc@gmail.com" className='flex items-center gap-3'>
                                            <MdMail className='text-gray-600 text-base md:text-lg' />
                                            <p className='text-gray-600 text-sm md:text-base'>abc@gmail.com</p>
                                        </a>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <a href='https://www.google.com' className='flex items-center gap-3'>
                                            <RiGlobalFill className='text-gray-600 text-base md:text-lg' />
                                            <p className='text-gray-600 text-sm md:text-base'>www.eitech.com</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className='hidden lg:block'>
                                <h2 className='text-xl font-semibold mb-4 text-gray-800'>Contact Us</h2>
                                <ul className='space-y-3'>
                                    <li className='flex items-center gap-3'>
                                        <a href="tel:+1234567890" className='flex items-center gap-3'>
                                            <BiPhone className='text-gray-600 text-lg' />
                                            <p className='text-gray-600'>+91 1234567890</p>
                                        </a>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <CiLocationOn className='text-gray-600 text-lg' />
                                        <p className='text-gray-600'>421 Allen, Mexico 4233</p>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <a href="mailto:abc@gmail.com" className='flex items-center gap-3'>
                                            <MdMail className='text-gray-600 text-lg' />
                                            <p className='text-gray-600'>abc@gmail.com</p>
                                        </a>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <a href='https://www.google.com' className='flex items-center gap-3'>
                                            <RiGlobalFill className='text-gray-600 text-lg' />
                                            <p className='text-gray-600'>www.eitech.com</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div className='mx-auto text-gray-700'>
                        <hr className='text-gray-600 mt-8' />
                        <p className='text-center mt-5 text-base '>
                            © Copyright 2024 -Eitech. All Right Reserved
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer