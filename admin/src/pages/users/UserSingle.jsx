import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userAPI } from '../../utils/api'
import BackButton from '../../components/BackButton'

function UserSingle() {
    const { id } = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userAPI.getSingleUser(id)
                setUser(response.data || {})
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [id])

    if (!user) return <div>Loading...</div>

    return (
        <>
            <BackButton />
            <div className='max-w-4xl mx-auto p-2 sm:p-4'>
                <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
                    <h1 className='text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6'>User Details</h1>
                    
                    <div className='space-y-4 sm:space-y-6'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
                            <div>
                                <span className='text-xs sm:text-sm font-semibold text-gray-600'>Name:</span>
                                <p className='text-sm sm:text-base font-medium'>{user.name}</p>
                            </div>
                            <div>
                                <span className='text-xs sm:text-sm font-semibold text-gray-600'>Email:</span>
                                <p className='text-sm sm:text-base break-all'>{user.email}</p>
                            </div>
                            <div>
                                <span className='text-xs sm:text-sm font-semibold text-gray-600'>Role:</span>
                                <span className={`text-xs sm:text-sm px-2 py-1 rounded ml-2 ${
                                    user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                }`}>{user.role}</span>
                            </div>
                            <div>
                                <span className='text-xs sm:text-sm font-semibold text-gray-600'>Created:</span>
                                <p className='text-sm sm:text-base'>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSingle