import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { userAPI } from '../../utils/api'
import BackButton from '../../components/BackButton'

function EditUser() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        role: ""
    })

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

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Map frontend field names to database column names
            const userData = {
                name: user.name,
                email: user.email,
                role: user.role
            }
            await userAPI.editUser(id, userData)
            alert("User updated successfully!")
            navigate('/users')
        } catch (error) {
            console.error('Error updating user:', error)
            alert('Failed to update user. Please try again.')
        }
    }

    return (
        <>
            <BackButton />
            <div className='max-w-4xl mx-auto p-2 sm:p-4'>
                <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
                    <h1 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>Edit User</h1>
                    
                    <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Full Name:</label>
                            <input type="text" name="name" placeholder='Full Name'
                                value={user.name} onChange={handleChange}
                                className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                                required />
                        </div>
                        
                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Email:</label>
                            <input type="email" name="email" placeholder='Email Address'
                                value={user.email} onChange={handleChange}
                                className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                                required />
                        </div>
                        
                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Role:</label>
                            <select name="role" value={user.role} onChange={handleChange}
                                className='w-full sm:w-auto bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                                required>
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        
                        <button type='submit'
                            className='w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white p-2 sm:p-3 px-4 sm:px-6 rounded transition-colors text-sm sm:text-base'>
                            Update User
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditUser