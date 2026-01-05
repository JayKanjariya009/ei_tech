import React, { useEffect, useState } from 'react'
import { userAPI } from '../../utils/api'
import { FaPen, FaRegEye } from 'react-icons/fa'
import { ImBin2 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

function Users() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const handleDeleteUser = async (id) => {
        try {
            await userAPI.removeUser(id)
            alert("User deleted successfully!")
            fetchUsers()
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await userAPI.getUsers()
            setUsers(response.data || [])
        } catch (error) {
            console.log(error)
            setUsers([])
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
            <div className='max-w-7xl p-2 sm:p-4 font-semibold flex items-center'>
                <div className='mr-auto'>
                    <h1 className='text-lg sm:text-xl'>Users Management</h1>
                    <p className='text-xs sm:text-sm text-gray-600 font-normal'>
                        {users.length} user{users.length !== 1 ? 's' : ''} found
                    </p>
                </div>
            </div>

            <div className='bg-gray-200 p-1 sm:p-2'>
                {users && users.map((user) => (
                    <div key={user.id} className='flex flex-col sm:flex-row items-start sm:items-center bg-white p-2 sm:p-3 m-2 sm:m-4 rounded-lg shadow-md gap-2 sm:gap-0'>
                        <div className='p-2 sm:p-3 items-center'>
                            <h1 className='p-2 sm:p-3 bg-gray-300 rounded text-sm sm:text-base'>
                                {user.id}
                            </h1>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <h2 className='text-lg sm:text-xl font-bold truncate'>{user.name}</h2>
                            <p className='text-gray-600 p-1 text-sm sm:text-base font-medium'>{user.email}</p>
                            <span className='text-xs sm:text-sm bg-blue-100 px-2 py-1 rounded'>{user.role}</span>
                        </div>
                        <div className='flex gap-2 sm:gap-4 ml-auto'>
                            <FaRegEye className='bg-blue-400 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-blue-500 transition-colors'
                                onClick={() => { navigate(`/users/${user.id}`) }}
                                title="View User" />
                            <FaPen className='bg-green-400 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-green-500 transition-colors'
                                onClick={() => { navigate(`/users/edit/${user.id}`) }}
                                title="Edit User" />
                            <ImBin2 className='bg-red-500 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-red-600 transition-colors'
                                onClick={() => handleDeleteUser(user.id)}
                                title="Delete User" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Users