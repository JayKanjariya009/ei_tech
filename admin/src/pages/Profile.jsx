import React, { useEffect, useState } from 'react'
import { userAPI } from '../utils/api'
import { FaUser, FaEnvelope, FaLock, FaEdit, FaSave } from 'react-icons/fa'
import BackButton from '../components/BackButton'

function Profile() {
    const [profile, setProfile] = useState({
        id: "",
        name: "",
        email: "",
        role: ""
    })
    const [isEditing, setIsEditing] = useState(false)
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [showPasswordForm, setShowPasswordForm] = useState(false)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await userAPI.getProfile()
                setProfile(response.data || {})
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfile()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setProfile(prev => ({ ...prev, [name]: value }))
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setPasswordData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await userAPI.updateProfile(profile)
            alert("Profile updated successfully!")
            setIsEditing(false)
        } catch (error) {
            console.error('Error updating profile:', error)
            alert('Failed to update profile. Please try again.')
        }
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords don't match!")
            return
        }
        try {
            await userAPI.updatePassword(profile.id, {
                oldPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            })
            alert("Password updated successfully!")
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
            setShowPasswordForm(false)
        } catch (error) {
            console.error('Error updating password:', error)
            alert('Failed to update password. Please try again.')
        }
    }

    return (
        <>
            <BackButton />
            <div className='max-w-4xl mx-auto p-2 sm:p-4'>
                <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
                    {/* Header */}
                    <div className='bg-gradient-to-r from-blue-500 to-purple-600 px-4 sm:px-6 py-6 sm:py-8'>
                        <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6'>
                            <div className='w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center'>
                                <FaUser className='text-2xl sm:text-3xl text-gray-600' />
                            </div>
                            <div className='text-white text-center sm:text-left'>
                                <h1 className='text-2xl sm:text-3xl font-bold'>{profile?.name || 'User Profile'}</h1>
                                <p className='text-blue-100 text-sm sm:text-base'>{profile?.role || 'User'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className='p-4 sm:p-6'>
                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0'>
                            <h2 className='text-xl sm:text-2xl font-semibold text-gray-800'>Profile Information</h2>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base'
                            >
                                <FaEdit /> {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
                                <div>
                                    <label className='flex items-center gap-2 text-gray-700 font-medium mb-2 text-sm sm:text-base'>
                                        <FaUser /> Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={profile?.name || ''}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                                            isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'
                                        }`}
                                    />
                                </div>
                                <div>
                                    <label className='flex items-center gap-2 text-gray-700 font-medium mb-2 text-sm sm:text-base'>
                                        <FaEnvelope /> Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile?.email || ''}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                                            isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'
                                        }`}
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div className='flex gap-4'>
                                    <button
                                        type='submit'
                                        className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base'
                                    >
                                        <FaSave /> Save Changes
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Password Section */}
                    <div className='border-t px-4 sm:px-6 py-4 sm:py-6'>
                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0'>
                            <h3 className='text-lg sm:text-xl font-semibold text-gray-800'>Security</h3>
                            <button
                                onClick={() => setShowPasswordForm(!showPasswordForm)}
                                className='flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base'
                            >
                                <FaLock /> Change Password
                            </button>
                        </div>

                        {showPasswordForm && (
                            <form onSubmit={handlePasswordSubmit} className='bg-gray-50 p-3 sm:p-4 rounded-lg space-y-3 sm:space-y-4'>
                                <div>
                                    <label className='block text-gray-700 font-medium mb-2 text-sm sm:text-base'>Current Password</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        className='w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base'
                                        required
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4'>
                                    <div>
                                        <label className='block text-gray-700 font-medium mb-2 text-sm sm:text-base'>New Password</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                            className='w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-gray-700 font-medium mb-2 text-sm sm:text-base'>Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            className='w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                                    <button
                                        type='submit'
                                        className='bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base'
                                    >
                                        Update Password
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => setShowPasswordForm(false)}
                                        className='bg-gray-500 hover:bg-gray-600 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors text-sm sm:text-base'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile