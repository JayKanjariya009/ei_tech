import React, { useEffect, useState } from 'react'
import { contactAPI } from '../../utils/api'
import { FaRegEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Contacts() {
    const [contacts, setContacts] = useState([])
    const navigate = useNavigate()

    const fetchContacts = async () => {
        try {
            const response = await contactAPI.getContacts()
            setContacts(response.data || [])
        } catch (error) {
            console.log(error)
            setContacts([])
        }
    }

    useEffect(() => {
        fetchContacts()
    }, [])

    return (
        <>
            <div className='max-w-7xl p-2 sm:p-4 font-semibold flex items-center'>
                <div className='mr-auto'>
                    <h1 className='text-lg sm:text-xl'>Contact Messages</h1>
                    <p className='text-xs sm:text-sm text-gray-600 font-normal'>
                        {contacts.length} contact message{contacts.length !== 1 ? 's' : ''} found
                    </p>
                </div>
            </div>

            <div className='bg-gray-200 p-1 sm:p-2'>
                {contacts && contacts.map((contact) => (
                    <div key={contact.id} className='flex flex-col sm:flex-row items-start sm:items-center bg-white p-2 sm:p-3 m-2 sm:m-4 rounded-lg shadow-md gap-2 sm:gap-0'>
                        <div className='p-2 sm:p-3 items-center'>
                            <h1 className='p-2 sm:p-3 bg-gray-300 rounded text-sm sm:text-base'>
                                {contact.id}
                            </h1>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <h2 className='text-lg sm:text-xl font-bold truncate'>{contact.name}</h2>
                            <p className='text-gray-600 p-1 text-sm sm:text-base font-medium'>{contact.email}</p>
                            <p className='text-gray-600 line-clamp-2 sm:line-clamp-1 p-1 text-sm sm:text-base'>{contact.message}</p>
                        </div>
                        <div className='flex gap-2 sm:gap-4 ml-auto'>
                            <FaRegEye className='bg-blue-400 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-blue-500 transition-colors'
                                onClick={() => { navigate(`/contacts/${contact.id}`) }}
                                title="View Contact Message" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Contacts