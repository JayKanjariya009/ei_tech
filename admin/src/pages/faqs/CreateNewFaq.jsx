import React, { useState } from 'react'
import { faqAPI } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'

function CreateNewFaq() {
    const navigate = useNavigate()
    const [faq, setFaq] = useState({
        question: "",
        answer: "",
        category: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFaq(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await faqAPI.addFaq(faq)
            alert("FAQ added successfully!")
            navigate('/faqs')
        } catch (error) {
            console.error('Error adding FAQ:', error)
            alert('Failed to add FAQ. Please try again.')
        }
    }

    return (
        <>
            <BackButton />
            <div className='max-w-4xl mx-auto p-2 sm:p-4'>
                <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
                    <h1 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>Create New FAQ</h1>
                    
                    <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>FAQ Question:</label>
                            <input type="text" name="question" placeholder='What is your question?'
                                value={faq.question} onChange={handleChange}
                                className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                                required />
                        </div>
                        
                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>FAQ Answer:</label>
                            <textarea name="answer" placeholder='Provide a detailed answer...'
                                onChange={handleChange} value={faq.answer}
                                className='w-full bg-gray-100 p-2 sm:p-3 rounded border min-h-24 text-sm sm:text-base'
                                rows={5} required />
                        </div>
                        
                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Category:</label>
                            <select name="category" value={faq.category} onChange={handleChange}
                                className='w-full sm:w-auto bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                                required>
                                <option value="">Select Category</option>
                                <option value="general">General</option>
                                <option value="technical">Technical</option>
                                <option value="billing">Billing</option>
                                <option value="support">Support</option>
                            </select>
                        </div>
                        
                        <button type='submit'
                            className='w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white p-2 sm:p-3 px-4 sm:px-6 rounded transition-colors text-sm sm:text-base'>
                            Add FAQ
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateNewFaq