import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { teamAPI } from '../../utils/api'
import BackButton from '../../components/BackButton'

function TeamMemberSingle() {
    const { id } = useParams()
    const [teamMember, setTeamMember] = useState(null)

    useEffect(() => {
        const fetchTeamMember = async () => {
            try {
                const response = await teamAPI.getTeamMember(id)
                setTeamMember(response.data || {})
            } catch (error) {
                console.log(error)
            }
        }
        fetchTeamMember()
    }, [id])

    if (!teamMember) return <div>Loading...</div>

    return (
        <>
            <BackButton />
            <div className='max-w-4xl mx-auto p-2 sm:p-4'>
                <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
                    <h1 className='text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6'>{teamMember.name}</h1>
                    
                    <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
                        {teamMember.image && (
                            <div className='flex-shrink-0'>
                                <img src={`http://localhost:5000${teamMember.image.url || `/uploads/team/${teamMember.image.filename || teamMember.image}`}`}
                                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-200" 
                                    alt={teamMember.name} />
                            </div>
                        )}
                        
                        <div className='flex-1 space-y-3 sm:space-y-4'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                                <div>
                                    <span className='text-xs sm:text-sm font-semibold text-gray-600'>Position:</span>
                                    <p className='text-sm sm:text-base'>{teamMember.position}</p>
                                </div>
                                <div>
                                    <span className='text-xs sm:text-sm font-semibold text-gray-600'>Email:</span>
                                    <p className='text-sm sm:text-base break-all'>{teamMember.email}</p>
                                </div>
                                <div>
                                    <span className='text-xs sm:text-sm font-semibold text-gray-600'>Phone:</span>
                                    <p className='text-sm sm:text-base'>{teamMember.phone}</p>
                                </div>
                            </div>
                            
                            <div>
                                <span className='text-xs sm:text-sm font-semibold text-gray-600'>Bio:</span>
                                <p className='text-sm sm:text-base text-gray-700 mt-1'>{teamMember.bio}</p>
                            </div>
                            
                            <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
                                {teamMember.linkedin && (
                                    <div>
                                        <span className='text-xs sm:text-sm font-semibold text-gray-600'>LinkedIn:</span>
                                        <a href={teamMember.linkedin} target='_blank' rel='noopener noreferrer' 
                                           className='text-blue-600 hover:text-blue-800 text-sm sm:text-base break-all block'>
                                            {teamMember.linkedin}
                                        </a>
                                    </div>
                                )}
                                {teamMember.twitter && (
                                    <div>
                                        <span className='text-xs sm:text-sm font-semibold text-gray-600'>Twitter:</span>
                                        <a href={teamMember.twitter} target='_blank' rel='noopener noreferrer' 
                                           className='text-blue-600 hover:text-blue-800 text-sm sm:text-base break-all block'>
                                            {teamMember.twitter}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamMemberSingle