import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { contactAPI } from '../../utils/api'
import BackButton from '../../components/BackButton'

function ContactSingle() {
    const { id } = useParams()
    const [contact, setContact] = useState(null)

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await contactAPI.getSingleContact(id)
                setContact(response.data || {})
            } catch (error) {
                console.log(error)
            }
        }
        fetchContact()
    }, [id])

    if (!contact) return <div>Loading...</div>

    return (
        <>
            <BackButton />
            <div className='max-w-4xl mx-auto p-2 sm:p-4'>
                <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
                    <h1 className='text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6'>Contact Details</h1>
                    
                    <div className='space-y-4 sm:space-y-6'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
                            <div>
                                <span className='text-xs sm:text-sm font-semibold text-gray-600'>Name:</span>
                                <p className='text-sm sm:text-base font-medium'>{contact.name}</p>
                            </div>
                            <div>
                                <span className='text-xs sm:text-sm font-semibold text-gray-600'>Email:</span>
                                <p className='text-sm sm:text-base break-all'>{contact.email}</p>
                            </div>
                            <div>
                                <span className='text-xs sm:text-sm font-semibold text-gray-600'>Phone:</span>
                                <p className='text-sm sm:text-base'>{contact.phone}</p>
                            </div>
                            <div>
                                <span className='text-xs sm:text-sm font-semibold text-gray-600'>Date:</span>
                                <p className='text-sm sm:text-base'>{new Date(contact.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        
                        <div>
                            <span className='text-xs sm:text-sm font-semibold text-gray-600'>Subject:</span>
                            <p className='text-sm sm:text-base font-medium mt-1'>{contact.subject}</p>
                        </div>
                        
                        <div className='p-3 sm:p-4 bg-gray-50 rounded-lg'>
                            <span className='text-xs sm:text-sm font-semibold text-gray-600'>Message:</span>
                            <p className='text-sm sm:text-base text-gray-700 mt-2 leading-relaxed whitespace-pre-wrap'>{contact.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactSingle