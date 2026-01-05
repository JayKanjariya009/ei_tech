import React, { useEffect, useState } from 'react'
import { teamAPI } from '../../utils/api'
import { FaPen, FaPlus, FaRegEye } from 'react-icons/fa'
import { ImBin2 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

function Team() {
    const [teamMembers, setTeamMembers] = useState([])
    const navigate = useNavigate()

    const handleDeleteTeamMember = async (id) => {
        try {
            await teamAPI.removeTeamMember(id)
            alert("Team member deleted successfully!")
            fetchTeamMembers()
        } catch (error) {
            console.log(error)
        }
    }

    const fetchTeamMembers = async () => {
        try {
            const response = await teamAPI.getTeamMembers()
            setTeamMembers(response.data || [])
        } catch (error) {
            console.log(error)
            setTeamMembers([])
        }
    }

    useEffect(() => {
        fetchTeamMembers()
    }, [])

    return (
        <>
            <div className='max-w-7xl p-2 sm:p-4 font-semibold flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0'>
                <div className='mr-auto'>
                    <h1 className='text-lg sm:text-xl'>Team Management</h1>
                    <p className='text-xs sm:text-sm text-gray-600 font-normal'>
                        {teamMembers.length} team member{teamMembers.length !== 1 ? 's' : ''} found
                    </p>
                </div>
                <div>
                    <button className='bg-green-500 p-2 sm:p-3 m-1 sm:m-3 rounded flex items-center gap-2 sm:gap-3 text-white hover:bg-green-600 transition-colors text-sm sm:text-base'
                        onClick={() => { navigate("/newteammember") }}>
                        <span className='hidden sm:inline'>Add New Team Member</span>
                        <span className='sm:hidden'>Add Member</span>
                        <FaPlus />
                    </button>
                </div>
            </div>

            <div className='bg-gray-200 p-1 sm:p-2'>
                {teamMembers && teamMembers.map((member) => (
                    <div key={member.id} className='flex flex-col sm:flex-row items-start sm:items-center bg-white p-2 sm:p-3 m-2 sm:m-4 rounded-lg shadow-md gap-2 sm:gap-0'>
                        <div className='p-2 sm:p-3 items-center'>
                            <h1 className='p-2 sm:p-3 bg-gray-300 rounded text-sm sm:text-base'>
                                {member.id}
                            </h1>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <h2 className='text-lg sm:text-xl font-bold truncate'>{member.name}</h2>
                            <p className='text-gray-600 p-1 text-sm sm:text-base font-medium'>{member.position}</p>
                            <p className='text-gray-600 line-clamp-2 sm:line-clamp-1 p-1 text-sm sm:text-base'>{member.bio}</p>
                        </div>
                        <div className='flex gap-2 sm:gap-4 ml-auto'>
                            <FaRegEye className='bg-blue-400 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-blue-500 transition-colors'
                                onClick={() => { navigate(`/team/${member.id}`) }}
                                title="View Team Member" />
                            <FaPen className='bg-green-400 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-green-500 transition-colors'
                                onClick={() => { navigate(`/team/edit/${member.id}`) }}
                                title="Edit Team Member" />
                            <ImBin2 className='bg-red-500 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-red-600 transition-colors'
                                onClick={() => handleDeleteTeamMember(member.id)}
                                title="Delete Team Member" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Team