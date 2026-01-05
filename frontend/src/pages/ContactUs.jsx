import React, { useState } from 'react'
import Breadcrumb from '../components/BreadCrumb'
import { MdEmail, MdThumbUp, MdArrowOutward, MdOutlineDone } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { BiPhone } from 'react-icons/bi'
import { CgAlarm } from 'react-icons/cg'
import { contactAPI } from '../../utils/api'

function ContactUs() {

    const [email, setEmail] = useState('');
    const [contactForm, setContactForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        serviceType: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

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

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await contactAPI.createContact(contactForm);
            setContactForm({ firstName: '', lastName: '', phone: '', email: '', serviceType: '', message: '' });
            alert('Message sent successfully!');
        } catch (error) {
            alert('Failed to send message.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className=''>

                <div>
                    <Breadcrumb />
                </div>

                <div className='max-w-6xl mx-4 sm:mx-8 lg:mx-16 xl:mx-35 my-10 lg:my-20'>

                    <div className='mx-auto'>

                        <div
                            className='flex items-center w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto rounded-lg justify-center my-5 gap-3 bg-[#f1f1f1] py-2'>
                            <div className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] rounded-full p-1'>
                                <MdThumbUp className='text-white text-xl' />
                            </div>
                            <p className='uppercase bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] bg-clip-text text-transparent'>
                                Have Questions? Reach Out!
                            </p>
                        </div>


                        <div className=''>
                            <h2 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-center'>
                                Let's Discuss Your IT Needs
                            </h2>
                        </div>


                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 my-10'>

                            <div className='flex group hover:bg-linear-to-r from-[#665CEAFF] to-[#300B9BFF] bg-[#eff1ff] gap-3 p-2 rounded-lg'>

                                <div className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] rounded-full p-2  '>
                                    <MdEmail className=' text-white lg:w-10 h-auto text-xl' />
                                </div>

                                <div className=' group-hover:text-white'>
                                    <h3 className='text-lg font-semibold'>Our Mail</h3>
                                    <h4 className='group-hover:text-gray-200'>
                                        <Link to="mailto:eitechsolut@gmail.com">
                                            eitechsolut@gmail.com
                                        </Link>
                                    </h4>
                                </div>

                            </div>

                            <div className='flex group hover:bg-linear-to-r from-[#665CEAFF] to-[#300B9BFF] bg-[#eff1ff] gap-3 p-2 rounded-lg'>

                                <div className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] rounded-full p-2  '>
                                    <BiPhone className=' text-white lg:w-10 h-auto text-xl' />


                                </div>

                                <div className=' group-hover:text-white'>
                                    <h3 className='text-lg font-semibold'>Phone </h3>
                                    <h4 className='group-hover:text-gray-200'>
                                        <Link to="tel:+0123456789">
                                            +01 23456789
                                        </Link>
                                    </h4>
                                </div>

                            </div>


                            <div className='flex group hover:bg-linear-to-r from-[#665CEAFF] to-[#300B9BFF] bg-[#eff1ff] gap-3 p-2 rounded-lg'>

                                <div className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] rounded-full p-2  '>
                                    <CgAlarm className=' text-white lg:w-10 h-auto text-xl' />


                                </div>

                                <div className=' group-hover:text-white'>
                                    <h3 className='font-semibold text-lg'>
                                        Schedule</h3>
                                    <h4 className='group-hover:text-gray-200'>
                                        <Link to="mailto:eitechsolut@gmail.com" >
                                            sunday-Friday : 09:00AM - 05:00PM
                                        </Link>
                                    </h4>
                                </div>

                            </div>


                        </div>

                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>

                        <div className='order-2 lg:order-1'>
                            <img src="images/mail_image.png" alt="" className='w-full h-auto' />
                        </div>


                        <form onSubmit={handleContactSubmit} className='bg-[#eff1ff] p-4 sm:p-5 lg:p-6 rounded-lg order-1 lg:order-2'>

                            <h1 className='text-base sm:text-lg lg:text-xl font-semibold mb-4'>
                                Get In Touch Now
                            </h1>

                            <div className='grid grid-cols-2 gap-5 p-5 '>

                                <input type="text" className='bg-white rounded-md p-2' placeholder='First Name '
                                    value={contactForm.firstName}
                                    onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                                    required
                                />
                                <input type="text" className='bg-white rounded-md p-2'
                                    placeholder='Last Name'
                                    value={contactForm.lastName}
                                    onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                                />


                            </div>

                            <div className='grid grid-cols-2 gap-5 p-5 '>

                                <input type="tel" className='bg-white rounded-md p-2' placeholder='Phone Number  '
                                    value={contactForm.phone}
                                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                                />
                                <input type="email" className='bg-white rounded-md p-2'
                                    placeholder='Email Address'
                                    value={contactForm.email}
                                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                    required
                                />

                            </div>

                            <div className='p-5 '>

                                <input type="text" className='bg-white rounded-md p-2 w-full' placeholder='Service Type'
                                    value={contactForm.serviceType}
                                    onChange={(e) => setContactForm({ ...contactForm, serviceType: e.target.value })}
                                />

                            </div>

                            <div className='p-5 '>

                                <textarea className='bg-white rounded-md p-2 w-full min-h-32 max-h-104 resize-y' placeholder='Your Message'
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                    required
                                ></textarea>

                            </div>

                            <div className='bg-linear-to-r  from-[#300B9BFF] to-[#665CEAFF] p-5 rounded-lg  '>
                                <button type="submit" disabled={loading} className='flex items-center justify-center gap-2 text-white  w-full font-semibold text-xl '>
                                    {loading ? 'Sending...' : 'Get Started Now'} <MdArrowOutward />
                                </button>
                            </div>







                        </form>
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


            </div>

        </>
    )
}

export default ContactUs
