import React, { useState } from 'react'
import { teamAPI } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'

function CreateNewTeamMember() {
    const navigate = useNavigate()
    const [teamMember, setTeamMember] = useState({
        name: "",
        position: "",
        bio: "",
        email: "",
        phone: "",
        linkedin: "",
        twitter: ""
    })
    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setTeamMember(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        Object.keys(teamMember).forEach(key => {
            formData.append(key, teamMember[key])
        })
        if (image) {
            formData.append('image', image)
        }

        try {
            await teamAPI.addTeamMember(formData)
            alert("Team member added successfully!")
            navigate('/team')
        } catch (error) {
            console.error('Error adding team member:', error)
            alert('Failed to add team member. Please try again.')
        }
    }

    return (
        <>
            <BackButton />
            <div className='max-w-4xl mx-auto p-2 sm:p-4'>
                <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
                    <h1 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>Add New Team Member</h1>
                    
                    <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Profile Image:</label>
                            <input type="file" accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base' />
                            {image && (
                                <div className='mt-3'>
                                    <img src={URL.createObjectURL(image)}
                                        className="w-20 h-20 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-200" 
                                        alt="Preview" />
                                </div>
                            )}
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                                <label className='block mb-2 font-semibold text-sm sm:text-base'>Full Name:</label>
                                <input type="text" name="name" placeholder='Full Name'
                                    value={teamMember.name} onChange={handleChange}
                                    className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                                    required />
                            </div>
                            <div>
                                <label className='block mb-2 font-semibold text-sm sm:text-base'>Position:</label>
                                <input type="text" name="position" placeholder='Position'
                                    value={teamMember.position} onChange={handleChange}
                                    className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                                    required />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                                <label className='block mb-2 font-semibold text-sm sm:text-base'>Email:</label>
                                <input type="email" name="email" placeholder='Email'
                                    value={teamMember.email} onChange={handleChange}
                                    className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                                    required />
                            </div>
                            <div>
                                <label className='block mb-2 font-semibold text-sm sm:text-base'>Phone:</label>
                                <input type="text" name="phone" placeholder='Phone'
                                    value={teamMember.phone} onChange={handleChange}
                                    className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base' />
                            </div>
                        </div>

                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Bio:</label>
                            <textarea name="bio" placeholder='Tell us about this team member...'
                                onChange={handleChange} value={teamMember.bio}
                                className='w-full bg-gray-100 p-2 sm:p-3 rounded border min-h-20 text-sm sm:text-base'
                                rows={4} required />
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                                <label className='block mb-2 font-semibold text-sm sm:text-base'>LinkedIn URL:</label>
                                <input type="url" name="linkedin" placeholder='https://linkedin.com/in/username'
                                    value={teamMember.linkedin} onChange={handleChange}
                                    className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base' />
                            </div>
                            <div>
                                <label className='block mb-2 font-semibold text-sm sm:text-base'>Twitter URL:</label>
                                <input type="url" name="twitter" placeholder='https://twitter.com/username'
                                    value={teamMember.twitter} onChange={handleChange}
                                    className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base' />
                            </div>
                        </div>

                        <button type='submit'
                            className='w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white p-2 sm:p-3 px-4 sm:px-6 rounded transition-colors text-sm sm:text-base'>
                            Add Team Member
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateNewTeamMember