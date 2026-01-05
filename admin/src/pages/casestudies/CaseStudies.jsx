import React, { useEffect, useState } from 'react'
import { caseStudyAPI } from '../../utils/api'
import { FaPen, FaPlus, FaRegEye } from 'react-icons/fa'
import { ImBin2 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

function CaseStudies() {
    const [caseStudies, setCaseStudies] = useState([])
    const navigate = useNavigate()

    const handleDeleteCaseStudy = async (id) => {
        try {
            await caseStudyAPI.removeCaseStudy(id)
            alert("Case Study deleted successfully!")
            fetchCaseStudies()
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCaseStudies = async () => {
        try {
            const response = await caseStudyAPI.getCaseStudies()
            setCaseStudies(response.data.data || [])
        } catch (error) {
            console.log(error)
            setCaseStudies([])
        }
    }

    useEffect(() => {
        fetchCaseStudies()
    }, [])

    return (
        <>
            <div className='max-w-7xl p-2 sm:p-4 font-semibold flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0'>
                <div className='mr-auto'>
                    <h1 className='text-lg sm:text-xl'>Case Studies Management</h1>
                    <p className='text-xs sm:text-sm text-gray-600 font-normal'>
                        {caseStudies.length} case stud{caseStudies.length !== 1 ? 'ies' : 'y'} found
                    </p>
                </div>
                <div>
                    <button className='bg-green-500 p-2 sm:p-3 m-1 sm:m-3 rounded flex items-center gap-2 sm:gap-3 text-white hover:bg-green-600 transition-colors text-sm sm:text-base'
                        onClick={() => { navigate("/newcasestudy") }}>
                        <span className='hidden sm:inline'>Create New Case Study</span>
                        <span className='sm:hidden'>New Case Study</span>
                        <FaPlus />
                    </button>
                </div>
            </div>

            <div className='bg-gray-200 p-1 sm:p-2'>
                {caseStudies.map((caseStudy) => (
                    <div key={caseStudy.id} className='flex flex-col sm:flex-row items-start sm:items-center bg-white p-2 sm:p-3 m-2 sm:m-4 rounded-lg shadow-md gap-2 sm:gap-0'>
                        <div className='p-2 sm:p-3 items-center'>
                            <h1 className='p-2 sm:p-3 bg-gray-300 rounded text-sm sm:text-base'>
                                {caseStudy.id}
                            </h1>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <h2 className='text-lg sm:text-xl font-bold truncate'>{caseStudy.title}</h2>
                            <p className='text-gray-600 line-clamp-2 sm:line-clamp-1 p-1 text-sm sm:text-base'>{caseStudy.description}</p>
                        </div>
                        <div className='flex gap-2 sm:gap-4 ml-auto'>
                            <FaRegEye className='bg-blue-400 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-blue-500 transition-colors'
                                onClick={() => { navigate(`/casestudies/${caseStudy.id}`) }}
                                title="View Case Study" />
                            <FaPen className='bg-green-400 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-green-500 transition-colors'
                                onClick={() => { navigate(`/casestudies/edit/${caseStudy.id}`) }}
                                title="Edit Case Study" />
                            <ImBin2 className='bg-red-500 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-red-600 transition-colors'
                                onClick={() => handleDeleteCaseStudy(caseStudy.id)}
                                title="Delete Case Study" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CaseStudies