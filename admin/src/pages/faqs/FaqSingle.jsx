import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { faqAPI } from '../../utils/api'
import BackButton from '../../components/BackButton'

function FaqSingle() {
    const { id } = useParams()
    const [faq, setFaq] = useState(null)

    useEffect(() => {
        const fetchFaq = async () => {
            try {
                const response = await faqAPI.getSingleFaq(id)
                setFaq(response.data.faq || {})
            } catch (error) {
                console.log(error)
            }
        }
        fetchFaq()
    }, [id])

    if (!faq) return <div>Loading...</div>

    return (
        <>
            <BackButton />
            <div className='max-w-4xl mx-auto p-2 sm:p-4'>
                <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
                    <h1 className='text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6'>FAQ Details</h1>
                    
                    <div className='space-y-4 sm:space-y-6'>
                        <div>
                            <span className='text-xs sm:text-sm font-semibold text-gray-600'>Category:</span>
                            <span className='ml-2 text-xs sm:text-sm bg-blue-100 px-2 py-1 rounded'>{faq.category}</span>
                        </div>
                        
                        <div className='p-3 sm:p-4 bg-blue-50 rounded-lg'>
                            <span className='text-xs sm:text-sm font-semibold text-blue-800'>Question:</span>
                            <p className='text-sm sm:text-base text-gray-700 mt-2 font-medium'>{faq.question}</p>
                        </div>
                        
                        <div className='p-3 sm:p-4 bg-green-50 rounded-lg'>
                            <span className='text-xs sm:text-sm font-semibold text-green-800'>Answer:</span>
                            <p className='text-sm sm:text-base text-gray-700 mt-2 leading-relaxed whitespace-pre-wrap'>{faq.answer}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FaqSingle