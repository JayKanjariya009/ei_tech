import React, { useState } from 'react'
import "../App.css"
import { Link } from "react-router-dom"

//icons
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";



function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [openSubDropdown, setOpenSubDropdown] = useState(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
        setOpenSubDropdown(null);
    };
    const toggleSubDropdown = (subdropdown) => {
        setOpenSubDropdown(openSubDropdown === subdropdown ? null : subdropdown);
    };

    return (
        <>
            <div className="w-[90%] mx-auto mt-5 absolute z-20 lg:ml-20">
                <nav className="bg-[#4b33ab] px-4 lg:px-16 py-4 flex items-center justify-between w-full rounded-xl">

                    <div className="flex items-center">
                        <img src="/images/header_logo.png" alt="Eitech" className="h-12" />
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex items-center space-x-8 text-white text-lg font-medium">
                        <li className="flex items-center space-x-1 cursor-pointer hover:text-gray-200">
                            <Link to="/" ><span>Home</span></Link>

                        </li>

                        <li className="relative group cursor-pointer">
                            <div className="flex items-center space-x-1 hover:text-gray-200">
                                <span>Pages</span>
                                <FaAngleDown className="text-sm" />
                            </div>
                            <div className="absolute left-0 mt-2 hidden group-hover:block bg-white text-black shadow-xl rounded p-3 w-48 z-50">
                                <p className="py-1 hover:text-blue-600 hover:underline"><Link to="/aboutus">About Us</Link></p>
                                <p className="py-1 hover:text-blue-600 hover:underline"><Link to="/ourteam">Our Team</Link></p>
                                <p className="py-1 hover:text-blue-600 hover:underline"><Link to="/testimonials">Testimonials</Link></p>
                                <p className="py-1 hover:text-blue-600 hover:underline"><Link to="/contactus">Contact Us</Link></p>
                                <p className="py-1 hover:text-blue-600 hover:underline"><Link to="/faq">FAQs</Link></p>
                                <p className="py-1 hover:text-blue-600 hover:underline"><Link to="/notfound">404</Link></p>
                            </div>
                        </li>

                        <li className="relative group cursor-pointer">
                            <div className="flex items-center space-x-1 hover:text-gray-200">
                                <span>Services</span>
                                <FaAngleDown className="text-sm" />
                            </div>
                            <div className="absolute left-0 mt-2 hidden group-hover:block bg-white text-black shadow-xl rounded p-3 w-60 z-50">
                                <p className="py-1 hover:text-blue-600 hover:underline cursor-pointer"><Link to="/ourservices">Our Service</Link></p>
                                <div className="relative group/details py-1 cursor-pointer">
                                    <div className="flex justify-between items-center hover:text-blue-600 hover:underline">
                                        Service Details
                                        <span>&gt;</span>
                                    </div>
                                    <div className="absolute top-0 left-full ml-2 hidden group-hover/details:block bg-white text-black shadow-xl rounded p-3 w-60">
                                        <Link to="/ourservices" >
                                            <p className="py-1 hover:text-blue-600 cursor-pointer hover:underline">Service Left</p>
                                        </Link>
                                        <Link to="/ourservices">
                                            <p className="py-1 hover:text-blue-600 cursor-pointer hover:underline">Service Right</p>
                                        </Link>
                                        <Link to="/ourservices">
                                            <p className="py-1 hover:text-blue-600 cursor-pointer hover:underline">Service Single</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="relative group cursor-pointer">
                            <div className="flex items-center space-x-1 hover:text-gray-200">
                                <span>Case Study</span>
                                <FaAngleDown className="text-sm" />
                            </div>
                            <div className="absolute left-0 mt-2 hidden group-hover:block bg-white text-black shadow-xl rounded p-3 w-60 z-50">
                                <Link to="/casestudy">
                                    <p className="py-1 hover:text-blue-600 hover:underline cursor-pointer">case study</p></Link>
                                <div className="relative group/details py-1 cursor-pointer">
                                    <div className="flex justify-between items-center hover:text-blue-600 hover:underline">
                                        case study Details
                                        <span>&gt;</span>
                                    </div>
                                    <div className="absolute top-0 left-full ml-2 hidden group-hover/details:block bg-white text-black shadow-xl rounded p-3 w-48">
                                        <Link to="/casestudy">
                                            <p className="py-1 hover:text-blue-600 cursor-pointer hover:underline">case study Left</p>
                                        </Link>
                                        <Link to="/casestudy">
                                            <p className="py-1 hover:text-blue-600 cursor-pointer hover:underline">case study Right</p>
                                        </Link>
                                        <Link to="/casestudy">
                                            <p className="py-1 hover:text-blue-600 cursor-pointer hover:underline">case study Single</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="relative group cursor-pointer">
                            <div className="flex items-center space-x-1 hover:text-gray-200">
                                <span>Blogs</span>
                                <FaAngleDown className="text-sm" />
                            </div>
                            <div className="absolute left-0 mt-2 hidden group-hover:block bg-white text-black shadow-xl rounded p-3 w-48 z-50">
                                <Link to="/blogs">
                                    <p className="py-1 hover:text-blue-600 hover:underline cursor-pointer">Our Blogs</p>
                                </Link>
                            </div>
                        </li>

                        <li className="cursor-pointer hover:text-gray-200">
                            <Link to="/contactus">Contact</Link>
                        </li>
                    </ul>

                    {/* Desktop Get Started Button */}
                    <Link to="/contactus" className="hidden lg:block">
                        <button className="bg-white text-[#4b33ab] px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-100 transition-colors">
                            <span>Get Started Now</span>
                            <MdArrowOutward className="text-lg" />
                        </button>
                    </Link>

                    {/* Mobile Hamburger Button */}
                    <button 
                        onClick={toggleMenu}
                        className="lg:hidden text-white text-2xl"
                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                </nav>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-[#4b33ab] mt-2 rounded-xl overflow-hidden">
                        <div className="px-4 py-2 space-y-2">
                            {/* Home */}
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-white py-2 hover:text-gray-200">
                                Home
                            </Link>

                            {/* Pages Dropdown */}
                            <div>
                                <button 
                                    onClick={() => toggleDropdown('pages')}
                                    className="flex items-center justify-between w-full text-white py-2 hover:text-gray-200"
                                >
                                    <span>Pages</span>
                                    <FaAngleDown className={`text-sm transition-transform ${openDropdown === 'pages' ? 'rotate-180' : ''}`} />
                                </button>
                                {openDropdown === 'pages' && (
                                    <div className="pl-4 space-y-1">
                                        <Link to="/aboutus" onClick={() => setIsMenuOpen(false)} className="block text-gray-200 py-1 hover:text-white">
                                            About Us
                                        </Link>
                                        <Link to="/ourteam" onClick={() => setIsMenuOpen(false)} className="block text-gray-200 py-1 hover:text-white">
                                            Our Team
                                        </Link>
                                        <Link to="/testimonials" onClick={() => setIsMenuOpen(false)} className="block text-gray-200 py-1 hover:text-white">
                                            Testimonials
                                        </Link>
                                        <Link to="/contactus" onClick={() => setIsMenuOpen(false)} className="block text-gray-200 py-1 hover:text-white">
                                            Contact Us
                                        </Link>
                                        <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="block text-gray-200 py-1 hover:text-white">
                                            FAQs
                                        </Link>
                                        <Link to="/notfound" onClick={() => setIsMenuOpen(false)} className="block text-gray-200 py-1 hover:text-white">
                                            404
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Services Dropdown */}
                            <div>
                                <button 
                                    onClick={() => toggleDropdown('services')}
                                    className="flex items-center justify-between w-full text-white py-2 hover:text-gray-200"
                                >
                                    <span>Services</span>
                                    <FaAngleDown className={`text-sm transition-transform ${openDropdown === 'services' ? 'rotate-180' : ''}`} />
                                </button>
                                {openDropdown === 'services' && (
                                    <div className="pl-4 space-y-1">
                                        <Link to="/ourservices" onClick={() => setIsMenuOpen(false)} className="block text-gray-200 py-1 hover:text-white">
                                            Our Service
                                        </Link>
                                        <div>
                                            <button 
                                                onClick={() => toggleSubDropdown('serviceDetails')}
                                                className="flex items-center justify-between w-full text-gray-200 py-1 hover:text-white"
                                            >
                                                <span>Service Details</span>
                                                <FaAngleDown className={`text-xs transition-transform ${openSubDropdown === 'serviceDetails' ? 'rotate-180' : ''}`} />
                                            </button>
                                            {openSubDropdown === 'serviceDetails' && (
                                                <div className="pl-4 space-y-1">
                                                    <Link to="/ourservices" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 py-1 hover:text-white">
                                                        Service Left
                                                    </Link>
                                                    <Link to="/ourservices" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 py-1 hover:text-white">
                                                        Service Right
                                                    </Link>
                                                    <Link to="/ourservices" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 py-1 hover:text-white">
                                                        Service Single
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Case Study Dropdown */}
                            <div>
                                <button 
                                    onClick={() => toggleDropdown('casestudy')}
                                    className="flex items-center justify-between w-full text-white py-2 hover:text-gray-200"
                                >
                                    <span>Case Study</span>
                                    <FaAngleDown className={`text-sm transition-transform ${openDropdown === 'casestudy' ? 'rotate-180' : ''}`} />
                                </button>
                                {openDropdown === 'casestudy' && (
                                    <div className="pl-4 space-y-1">
                                        <Link to="/casestudy" onClick={() => setIsMenuOpen(false)} className="block text-gray-200 py-1 hover:text-white">
                                            Case Study
                                        </Link>
                                        <div>
                                            <button 
                                                onClick={() => toggleSubDropdown('caseDetails')}
                                                className="flex items-center justify-between w-full text-gray-200 py-1 hover:text-white"
                                            >
                                                <span>Case Study Details</span>
                                                <FaAngleDown className={`text-xs transition-transform ${openSubDropdown === 'caseDetails' ? 'rotate-180' : ''}`} />
                                            </button>
                                            {openSubDropdown === 'caseDetails' && (
                                                <div className="pl-4 space-y-1">
                                                    <Link to="/casestudy" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 py-1 hover:text-white">
                                                        Case Study Left
                                                    </Link>
                                                    <Link to="/casestudy" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 py-1 hover:text-white">
                                                        Case Study Right
                                                    </Link>
                                                    <Link to="/casestudy" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 py-1 hover:text-white">
                                                        Case Study Single
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Blogs Dropdown */}
                            <div>
                                <button 
                                    onClick={() => toggleDropdown('blogs')}
                                    className="flex items-center justify-between w-full text-white py-2 hover:text-gray-200"
                                >
                                    <span>Blogs</span>
                                    <FaAngleDown className={`text-sm transition-transform ${openDropdown === 'blogs' ? 'rotate-180' : ''}`} />
                                </button>
                                {openDropdown === 'blogs' && (
                                    <div className="pl-4 space-y-1">
                                        <Link to="/blogs" onClick={() => setIsMenuOpen(false)} className="block text-gray-200 py-1 hover:text-white">
                                            Our Blogs
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Contact */}
                            <Link to="/contactus" onClick={() => setIsMenuOpen(false)} className="block text-white py-2 hover:text-gray-200">
                                Contact
                            </Link>

                            {/* Mobile Get Started Button */}
                            <Link to="/contactus" onClick={() => setIsMenuOpen(false)} className="block mt-4">
                                <button className="bg-white text-[#4b33ab] px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-100 transition-colors w-full justify-center">
                                    <span>Get Started Now</span>
                                    <MdArrowOutward className="text-lg" />
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>


        </>
    )
}

export default Header