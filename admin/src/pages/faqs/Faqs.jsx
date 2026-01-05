import React, { useEffect, useState } from 'react'
import { faqAPI } from '../../utils/api'
import { FaPen, FaPlus, FaRegEye } from 'react-icons/fa'
import { ImBin2 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

function Faqs() {
    const [faqs, setFaqs] = useState([])
    const navigate = useNavigate()

    const handleDeleteFaq = async (id) => {
        try {
            await faqAPI.removeFaq(id)
            alert("FAQ deleted successfully!")
            fetchFaqs()
        } catch (error) {
            console.log(error)
        }
    }

    const fetchFaqs = async () => {
        try {
            const response = await faqAPI.getFaqs()
            setFaqs(response.data.faqs || [])
        } catch (error) {
            console.log(error)
            setFaqs([])
        }
    }

    useEffect(() => {
        fetchFaqs()
    }, [])

    return (
        <>
            <div className='max-w-7xl p-2 sm:p-4 font-semibold flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0'>
                <div className='mr-auto'>
                    <h1 className='text-lg sm:text-xl'>FAQs Management</h1>
                    <p className='text-xs sm:text-sm text-gray-600 font-normal'>
                        {faqs.length} FAQ{faqs.length !== 1 ? 's' : ''} found
                    </p>
                </div>
                <div>
                    <button className='bg-green-500 p-2 sm:p-3 m-1 sm:m-3 rounded flex items-center gap-2 sm:gap-3 text-white hover:bg-green-600 transition-colors text-sm sm:text-base'
                        onClick={() => { navigate("/newfaq") }}>
                        <span className='hidden sm:inline'>Create New FAQ</span>
                        <span className='sm:hidden'>New FAQ</span>
                        <FaPlus />
                    </button>
                </div>
            </div>

            <div className='bg-gray-200 p-1 sm:p-2'>
                {faqs && faqs.map((faq) => (
                    <div key={faq.id} className='flex flex-col sm:flex-row items-start sm:items-center bg-white p-2 sm:p-3 m-2 sm:m-4 rounded-lg shadow-md gap-2 sm:gap-0'>
                        <div className='p-2 sm:p-3 items-center'>
                            <h1 className='p-2 sm:p-3 bg-gray-300 rounded text-sm sm:text-base'>
                                {faq.id}
                            </h1>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <h2 className='text-lg sm:text-xl font-bold truncate'>{faq.question}</h2>
                            <p className='text-gray-600 line-clamp-2 sm:line-clamp-1 p-1 text-sm sm:text-base mb-1'>{faq.answer}</p>
                            <span className='text-xs sm:text-sm bg-blue-100 px-2 py-1 rounded'>{faq.category}</span>
                        </div>
                        <div className='flex gap-2 sm:gap-4 ml-auto'>
                            <FaRegEye className='bg-blue-400 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-blue-500 transition-colors'
                                onClick={() => { navigate(`/faqs/${faq.id}`) }}
                                title="View FAQ" />
                            <FaPen className='bg-green-400 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-green-500 transition-colors'
                                onClick={() => { navigate(`/faqs/edit/${faq.id}`) }}
                                title="Edit FAQ" />
                            <ImBin2 className='bg-red-500 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-red-600 transition-colors'
                                onClick={() => handleDeleteFaq(faq.id)}
                                title="Delete FAQ" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Faqs