import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { caseStudyAPI } from '../../utils/api'
import BackButton from '../../components/BackButton'

function EditCaseStudy() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [caseStudy, setCaseStudy] = useState({
        title: "",
        description: "",
        client: "",
        industry: "",
        challenge: "",
        solution: "",
        results: "",
        technologies: ""
    })

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

    const handleChange = (e) => {
        const { name, value } = e.target
        setCaseStudy(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await caseStudyAPI.editCaseStudy(id, caseStudy)
            alert("Case Study updated successfully!")
            navigate('/casestudies')
        } catch (error) {
            console.error('Error updating case study:', error)
            alert('Failed to update case study. Please try again.')
        }
    }

    return (
        <>
            <BackButton />
            <div className='max-w-4xl mx-auto p-2 sm:p-4'>
                <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
                    <h1 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>Edit Case Study</h1>
                    
                    <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                                <label className='block mb-2 font-semibold text-sm sm:text-base'>Case Study Title:</label>
                                <input type="text" name="title" placeholder='Case Study Title'
                                    value={caseStudy.title} onChange={handleChange}
                                    className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                                    required />
                            </div>
                            <div>
                                <label className='block mb-2 font-semibold text-sm sm:text-base'>Client Name:</label>
                                <input type="text" name="client" placeholder='Client Name'
                                    value={caseStudy.client} onChange={handleChange}
                                    className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                                    required />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                                <label className='block mb-2 font-semibold text-sm sm:text-base'>Industry:</label>
                                <input type="text" name="industry" placeholder='Industry'
                                    value={caseStudy.industry} onChange={handleChange}
                                    className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                                    required />
                            </div>
                            <div>
                                <label className='block mb-2 font-semibold text-sm sm:text-base'>Technologies:</label>
                                <input type="text" name='technologies' value={caseStudy.technologies}
                                    onChange={handleChange} placeholder='React, Node.js, MongoDB'
                                    className='w-full p-2 sm:p-3 bg-gray-100 rounded border text-sm sm:text-base' />
                            </div>
                        </div>

                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Description:</label>
                            <textarea name="description" placeholder='Description'
                                onChange={handleChange} value={caseStudy.description}
                                className='w-full bg-gray-100 p-2 sm:p-3 rounded border min-h-20 text-sm sm:text-base'
                                rows={3} required />
                        </div>

                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Challenge:</label>
                            <textarea name="challenge" placeholder='What challenges did the client face?'
                                onChange={handleChange} value={caseStudy.challenge}
                                className='w-full bg-gray-100 p-2 sm:p-3 rounded border min-h-20 text-sm sm:text-base'
                                rows={3} required />
                        </div>

                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Solution:</label>
                            <textarea name="solution" placeholder='How did you solve the problem?'
                                onChange={handleChange} value={caseStudy.solution}
                                className='w-full bg-gray-100 p-2 sm:p-3 rounded border min-h-20 text-sm sm:text-base'
                                rows={3} required />
                        </div>

                        <div>
                            <label className='block mb-2 font-semibold text-sm sm:text-base'>Results:</label>
                            <textarea name="results" placeholder='What were the outcomes and results?'
                                onChange={handleChange} value={caseStudy.results}
                                className='w-full bg-gray-100 p-2 sm:p-3 rounded border min-h-20 text-sm sm:text-base'
                                rows={3} required />
                        </div>

                        <button type='submit'
                            className='w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white p-2 sm:p-3 px-4 sm:px-6 rounded transition-colors text-sm sm:text-base'>
                            Update Case Study
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditCaseStudy