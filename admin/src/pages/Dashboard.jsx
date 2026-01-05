import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { serviceAPI, testimonialAPI, blogAPI, caseStudyAPI, teamAPI, contactAPI, faqAPI, userAPI } from '../utils/api'

function Dashboard() {
    const navigate = useNavigate()
    const [stats, setStats] = useState({
        services: 0,
        testimonials: 0,
        blogs: 0,
        caseStudies: 0,
        teamMembers: 0,
        contacts: 0,
        faqs: 0,
        users: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const [services, testimonials, blogs, caseStudies, team, contacts, faqs, users] = await Promise.all([
                serviceAPI.getServices().catch(() => ({ data: { services: [], totalServices: 0 } })),
                testimonialAPI.getAllTestimonialsAdmin().catch(() => ({ data: [] })),
                blogAPI.getBlogs().catch(() => ({ data: { data: [] } })),
                caseStudyAPI.getCaseStudies().catch(() => ({ data: { data: [] } })),
                teamAPI.getTeamMembers().catch(() => ({ data: [] })),
                contactAPI.getContacts().catch(() => ({ data: [] })),
                faqAPI.getFaqs().catch(() => ({ data: { faqs: [] } })),
                userAPI.getUsers().catch(() => ({ data: [] }))
            ])

            setStats({
                services: services?.data?.totalServices || services?.data?.services?.length || 0,
                testimonials: testimonials?.data?.length || 0,
                blogs: blogs?.data?.data?.length || 0,
                caseStudies: caseStudies?.data?.data?.length || 0,
                teamMembers: team?.data?.length || 0,
                contacts: contacts?.data?.length || 0,
                faqs: faqs?.length || faqs?.data?.faqs?.length || faqs?.data?.length || 0,
                users: users?.data?.length || 0
            })
        } catch (error) {
            console.error('Error fetching stats:', error)
            // Set all stats to 0 if there's an error
            setStats({
                services: 0,
                testimonials: 0,
                blogs: 0,
                caseStudies: 0,
                teamMembers: 0,
                contacts: 0,
                faqs: 0,
                users: 0
            })
        } finally {
            setLoading(false)
        }
    }

    const dashboardCards = [
        { title: 'Total Services', count: stats.services, path: '/services', color: 'bg-blue-500' },
        { title: 'Total Testimonials', count: stats.testimonials, path: '/testimonials', color: 'bg-green-500' },
        { title: 'Total Blogs', count: stats.blogs, path: '/blogs', color: 'bg-purple-500' },
        { title: 'Total Case Studies', count: stats.caseStudies, path: '/casestudies', color: 'bg-orange-500' },
        { title: 'Team Members', count: stats.teamMembers, path: '/team', color: 'bg-indigo-500' },
        { title: 'Contact Messages', count: stats.contacts, path: '/contacts', color: 'bg-red-500' },
        { title: 'Total FAQs', count: stats.faqs, path: '/faqs', color: 'bg-yellow-500' },
        { title: 'Total Users', count: stats.users, path: '/users', color: 'bg-gray-500' }
    ]

    const handleCardClick = (path) => {
        navigate(path)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading dashboard...</div>
            </div>
        )
    }

    return (
        <div className="p-2 sm:p-4 md:p-6 lg:p-8">
            <div className="mb-4 sm:mb-6 md:mb-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">Admin Dashboard</h1>
                <p className="text-sm sm:text-base text-gray-600">Welcome to your admin panel. Here's an overview of your content.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {dashboardCards.map((card, index) => (
                    <div
                        key={index}
                        onClick={() => handleCardClick(card.path)}
                        className={`${card.color} text-white p-3 sm:p-4 md:p-6 rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2 truncate">{card.title}</h3>
                                <p className="text-xl sm:text-2xl md:text-3xl font-bold">{card.count}</p>
                            </div>
                            <div className="text-2xl sm:text-3xl md:text-4xl opacity-80 ml-2">
                                📊
                            </div>
                        </div>
                        <div className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm opacity-90">
                            Click to manage →
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 sm:mt-6 md:mt-8 bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                    <button
                        onClick={() => navigate('/newservice')}
                        className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-blue-700 transition-colors w-full"
                    >
                        Add Service
                    </button>
                    <button
                        onClick={() => navigate('/newtestimonial')}
                        className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-green-700 transition-colors w-full"
                    >
                        Add Testimonial
                    </button>
                    <button
                        onClick={() => navigate('/newblog')}
                        className="bg-purple-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-purple-700 transition-colors w-full"
                    >
                        Add Blog
                    </button>
                    <button
                        onClick={() => navigate('/newcasestudy')}
                        className="bg-orange-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-orange-700 transition-colors w-full"
                    >
                        Add Case Study
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
