import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/BreadCrumb'
import axios from 'axios';
import { blogAPI, faqAPI, contactAPI } from '../../utils/api';
import { MdArrowOutward, MdOutlineDone } from 'react-icons/md';


function Faqs() {

    const [faqs, setFaqs] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [activefaqId, setActiveFaqId] = useState(null);
    const [loading, setLoading] = useState(null);
    const [email, setEmail] = useState('');



    const categories = [
        "All",
        "Cyber Security",
        "Help Desk Solution",
        "Software Development",
        "Cloud Solution",
        "Data Protection"
    ];

    useEffect(() => {
        const fetchFaqs = async () => {
            setLoading(true)
            try {
                const response = await faqAPI.getFaqs();
                // console.log(response);

                // Check if response is HTML instead of JSON
                if (typeof response.data === 'string' && response.data.includes('<!doctype html>')) {
                    console.error('API returned HTML instead of JSON - check your backend endpoint');
                    setFaqs([]);
                    return;
                }

                setFaqs(response.data.faqs || response.data || []);
            } catch (error) {
                console.log("Error While Fetching Faqs", error);
                setFaqs([]);
            }
            finally {
                setLoading(false)
            }
        }

        fetchFaqs();
    }, [])




    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setActiveFaqId(null);
    }

    const togglefaq = (id) => {

        setActiveFaqId(activefaqId === id ? null : id);

    }

    const handleSubscribe = async () => {
        if (!email) return;
        try {
            await contactAPI.createContact({
                email,
                name: 'Newsletter Subscriber',
                message: 'Newsletter subscription'
            });
            setEmail('');
        } catch (error) {
            console.error('Error subscribing:', error);
        }
    };


    return (
        <>

            <div>
                <Breadcrumb />
            </div>

            <div className='bg-gray-50 py-8 sm:py-12 lg:py-16 px-4'>
                <div className='max-w-6xl mx-auto'>
                    <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-12 text-gray-900'>
                        Frequently Asked Question
                    </h2>

                    <div className='flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 lg:mb-12'>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryClick(cat)}
                                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${activeCategory === cat
                                    ? "bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white shadow-lg"
                                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {
                        loading ? (
                            <p className='text-2xl text-center text-gray-600 font-semibold animate-pulse'>
                                Loading
                            </p>
                        ) : (
                            <div className='grid grid-cols-1 gap-4 sm:gap-6'>
                                {faqs.filter(faq => faq.status === 'active' && (activeCategory === 'All' || faq.category === activeCategory)).map((faq) => (
                                    <div
                                        key={faq.id}
                                        className={`rounded-lg p-4 sm:p-6 cursor-pointer transition-all duration-300 ${activefaqId === faq.id
                                            ? 'bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white shadow-xl'
                                            : 'bg-white bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white shadow-md hover:shadow-lg'
                                            }`}
                                        onClick={() => togglefaq(faq.id)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <h4 className='text-sm sm:text-base lg:text-lg font-semibold pr-4 leading-relaxed'>
                                                {faq.question}
                                            </h4>
                                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 ${activefaqId === faq.id
                                                ? 'bg-white text-purple-600'
                                                : 'bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white'
                                                }`}>
                                                <span className='text-sm sm:text-lg font-bold'>
                                                    {activefaqId === faq.id ? "−" : "+"}
                                                </span>
                                            </div>
                                        </div>
                                        {activefaqId === faq.id && (
                                            <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed opacity-90">
                                                {faq.answer}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>

            {/* Message Div || TENTH DIV  */}
            <div className='relative bg-[url(images/contact-bg2.png)] py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden'>
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

export default Faqs
