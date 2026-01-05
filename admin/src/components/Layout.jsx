import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaBlog, FaQuoteLeft, FaCogs, FaFileAlt, FaPhone, FaQuestionCircle, FaUsers, FaBars } from 'react-icons/fa';
import { useState } from 'react';

function Layout() {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <div className="flex min-h-screen">

            {/* Sidebar */}
            <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gray-800 text-white p-4 sticky top-0 max-h-screen flex flex-col transition-all duration-300`}>
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="mb-4 p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                    <FaBars />
                </button>

                {!isCollapsed && (
                    <Link to={"/dashboard"}>
                        <h2 className="p-2 font-bold">
                            DashBoard
                        </h2>
                    </Link>
                )}

                <ul className="space-y-2 mt-6">
                    <li>
                        <NavLink
                            to="/blogs"
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            <FaBlog className={isCollapsed ? '' : 'inline mr-2'} /> {!isCollapsed && 'Blogs'}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/testimonials"
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            <FaQuoteLeft className={isCollapsed ? '' : 'inline mr-2'} /> {!isCollapsed && 'Testimonials'}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/services"
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            <FaCogs className={isCollapsed ? '' : 'inline mr-2'} /> {!isCollapsed && 'Services'}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/casestudies"
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            <FaFileAlt className={isCollapsed ? '' : 'inline mr-2'} /> {!isCollapsed && 'Case Studies'}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contacts"
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            <FaPhone className={isCollapsed ? '' : 'inline mr-2'} /> {!isCollapsed && 'Contacts'}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/faqs"
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            <FaQuestionCircle className={isCollapsed ? '' : 'inline mr-2'} /> {!isCollapsed && 'FAQs'}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/team"
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            <FaUsers className={isCollapsed ? '' : 'inline mr-2'} /> {!isCollapsed && 'Team'}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/users"
                            className={({ isActive }) =>
                                `block px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            <FaUsers className={isCollapsed ? '' : 'inline mr-2'} /> {!isCollapsed && 'Users'}
                        </NavLink>
                    </li>
                </ul>

                <div className="mt-auto pt-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-200"
                    >
                        <FaSignOutAlt /> {!isCollapsed && 'Logout'}
                    </button>
                </div>




            </div>

            {/* Main content */}
            <div className="flex-1 bg-gray-100">

                {/* Topbar */}
                <div className="bg-white shadow p-4 sticky top-0 min-h-30 flex justify-between items-center">
                    <span className="text-gray-600">Admin Dashboard</span>
                    <Link to="/profile" className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors">
                        <FaUser /> Profile
                    </Link>
                </div>

                {/* Page content */}
                <div className="p-4 overflow-auto">
                    <Outlet />
                </div>

            </div>
        </div>
    );
}

export default Layout;
