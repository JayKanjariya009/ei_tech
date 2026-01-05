import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { serviceAPI } from '../../utils/api.js'
import { MdArrowOutward, MdOutlineDone } from 'react-icons/md'

function SingleService() {
    const { id } = useParams()
    const [service, setService] = useState(null)
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');


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

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await serviceAPI.getServices()
                console.log('API Response:', response.data)
                
                // Handle different response structures
                let servicesArray = []
                if (Array.isArray(response.data)) {
                    servicesArray = response.data
                } else if (response.data.services && Array.isArray(response.data.services)) {
                    servicesArray = response.data.services
                } else if (response.data.data && Array.isArray(response.data.data)) {
                    servicesArray = response.data.data
                }

                const foundService = servicesArray.find(s => (s.id || s._id).toString() === id)

                if (foundService) {
                    console.log('Found service:', foundService)
                    setService(foundService)
                } else {
                    console.error('Service not found with ID:', id)
                }
            } catch (error) {
                console.error('Error fetching services:', error)
                // Set fallback service if API fails
                setService({
                    _id: id,
                    title: 'IT Service',
                    description: 'Professional IT service tailored to your business needs.',
                    image: null
                })
            } finally {
                setLoading(false)
            }
        }
        if (id) {
            fetchService()
        }
    }, [id])

    if (loading) return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>
    if (!service) return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Service not found</h2>
            <p className="text-gray-600 mb-4">The service you're looking for doesn't exist.</p>
            <Link to="/" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
                Back to Home
            </Link>
        </div>
    )

    return (
        <>
            {/* Hero Section */}
            <div className="bg-[url('/images/hero-bg1.png')] bg-cover bg-center min-h-135 relative overflow-hidden">
                <div className="container mx-auto mt-50 px-4 py-20">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-6">{service.title}</h1>
                        <div className="flex items-center justify-center space-x-2 text-lg mb-8">
                            <Link to="/" className="hover:text-gray-300">Home</Link>
                            <span>›</span>
                            <span>{service.title}</span>
                        </div>
                    </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-20 right-20 w-64 h-64 bg-linear-to-br from-blue-400 to-purple-600 rounded-full opacity-20"></div>
                <div className="absolute bottom-20 left-20 w-32 h-32 bg-linear-to-br from-pink-400 to-red-600 rounded-full opacity-20"></div>
            </div>

            {/* Main Content */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Service Image */}
                        {service.images && service.images.length > 0 && (
                            <div className="mb-12">
                                <img
                                    src={`http://localhost:5000/uploads/serviceImages/${service.images[0]}`}
                                    alt={service.title}
                                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                                    onError={(e) => {
                                        console.log('Image failed to load:', e.target.src);
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}

                        {/* Service Details */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-6">{service.title}</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {service.description}
                            </p>
                        </div>

                        {/* Service Features */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4 text-purple-800">Key Features</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                                        Incident Response & Recovery
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                                        Secure Access Controls
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                                        Compliance Risk Management
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                                        Vulnerability Assessments
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4 text-blue-800">Our Approach</h3>
                                <p className="text-gray-600">
                                    In an era where cyber threats are becoming increasingly sophisticated, protecting
                                    your business has never been more crucial. Our comprehensive suite of services
                                    designed to defend against a wide range of cyber attacks.
                                </p>
                            </div>
                        </div>

                        {/* Additional Images */}
                        {service.images && service.images.length > 1 && (
                            <div className="grid md:grid-cols-2 gap-6 mb-12">
                                {service.images.slice(1, 3).map((img, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:5000/uploads/serviceImages/${img}`}
                                        alt={`${service.title} - Detail ${index + 1}`}
                                        className="w-full h-64 object-contain rounded-lg shadow-lg"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Call to Action */}
                        <div className="text-center bg-linear-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Ready to Secure Your Business?</h3>
                            <p className="mb-6">Contact us today to learn more about our {service.title} services.</p>
                            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                Get Started Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div>


            </div>


            {/* Message Div || TENTH DIV  */}
            <div className='relative bg-[url(/images/contact-bg2.png)] bg-cover bg-center bg-no-repeat py-16 px-8 overflow-hidden bg-linear-to-r from-purple-900 via-indigo-900 to-purple-800'>
                <div className='container mx-auto flex items-center justify-between'>

                    {/* Left Content */}
                    <div className='flex-1 text-white max-w-lg ml-35'>
                        <h2 className='text-4xl font-bold mb-4 leading-tight'>
                            Transform Your IT Today-<br />
                            Speak with Our Experts!
                        </h2>

                        <p className=' text-lg mb-8 opacity-90'>
                            Ready to take your business to  next level with cutting-edge IT<br />
                            solutions? Our team is here to help you transform.
                        </p>

                        <div className='relative flex max-w-md'>
                            <input
                                type="email"
                                placeholder='Email Address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='flex-1 px-4 py-3 rounded-l-lg bg-white text-gray-800 focus:outline-none'
                            />
                            <button
                                onClick={handleSubscribe}
                                className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] px-6 py-3 rounded-r-lg flex items-center gap-2 text-white font-medium hover:opacity-90 transition-opacity'
                            >
                                Subscribe <MdArrowOutward />
                            </button>
                        </div>
                    </div>

                    {/* Center Services */}
                    <div className='flex flex-col gap-4 mx-8'>
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
                    <div className='relative shrink-0 mr-25'>
                        <img
                            src="/images/contact-img1.png"
                            alt="Professional woman with tablet"
                            className='h-80 w-auto object-contain'

                        />

                        <img src="/images/contact-bg-bg2.png" alt="hey there"
                            className='absolute opacity-70 top-0 animate-[spin_15s_linear_infinite]'
                        />


                    </div>
                </div>
            </div>




        </>
    )
}

export default SingleService