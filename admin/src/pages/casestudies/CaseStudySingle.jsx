import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { caseStudyAPI } from '../../utils/api'
import BackButton from '../../components/BackButton'

function CaseStudySingle() {
    const { id } = useParams()
    const [caseStudy, setCaseStudy] = useState(null)

    useEffect(() => {
        const fetchCaseStudy = async () => {
            try {
                const response = await caseStudyAPI.getSingleCaseStudy(id)
                setCaseStudy(response.data.data || {})
            } catch (error) {
                console.log(error)
            }
        }
        fetchCaseStudy()
    }, [id])

    if (!caseStudy) return <div>Loading...</div>

    return (
        <>
            <BackButton />
            <div className='max-w-4xl mx-auto p-2 sm:p-4'>
                <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
                    <h1 className='text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6'>{caseStudy.title}</h1>
                    
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
                        <div className='space-y-3 sm:space-y-4'>
                            <div>
                                <span className='text-xs sm:text-sm font-semibold text-gray-600'>Client:</span>
                                <p className='text-sm sm:text-base'>{caseStudy.client}</p>
                            </div>
                            <div>
                                <span className='text-xs sm:text-sm font-semibold text-gray-600'>Industry:</span>
                                <p className='text-sm sm:text-base'>{caseStudy.industry}</p>
                            </div>
                            <div>
                                <span className='text-xs sm:text-sm font-semibold text-gray-600'>Technologies:</span>
                                <p className='text-sm sm:text-base'>{caseStudy.technologies}</p>
                            </div>
                        </div>
                        
                        <div className='space-y-3 sm:space-y-4'>
                            <div>
                                <span className='text-xs sm:text-sm font-semibold text-gray-600'>Description:</span>
                                <p className='text-sm sm:text-base text-gray-700'>{caseStudy.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className='mt-6 sm:mt-8 space-y-4 sm:space-y-6'>
                        <div className='p-3 sm:p-4 bg-red-50 rounded-lg'>
                            <h3 className='font-semibold mb-2 text-sm sm:text-base text-red-800'>Challenge:</h3>
                            <p className='text-sm sm:text-base text-gray-700'>{caseStudy.challenge}</p>
                        </div>
                        
                        <div className='p-3 sm:p-4 bg-blue-50 rounded-lg'>
                            <h3 className='font-semibold mb-2 text-sm sm:text-base text-blue-800'>Solution:</h3>
                            <p className='text-sm sm:text-base text-gray-700'>{caseStudy.solution}</p>
                        </div>
                        
                        <div className='p-3 sm:p-4 bg-green-50 rounded-lg'>
                            <h3 className='font-semibold mb-2 text-sm sm:text-base text-green-800'>Results:</h3>
                            <p className='text-sm sm:text-base text-gray-700'>{caseStudy.results}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CaseStudySingle