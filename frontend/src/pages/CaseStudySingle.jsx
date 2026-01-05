import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/BreadCrumb'
import { caseStudyAPI } from '../../utils/api'
import { FaCheckCircle } from 'react-icons/fa'
import { FaCheck } from "react-icons/fa";



function CaseStudySingle() {

    const { id } = useParams()
    const [caseStudy, setCaseStudy] = useState([])
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        if (!id) {
            console.log('No ID found in URL params');
            setLoading(false);
            return;
        }

        const fetchCaseStudy = async () => {
            // console.log('Fetching case study with ID:', id);

            try {
                const res = await caseStudyAPI.getSingleCaseStudy(id)
                // console.log('API Response:', res);
                setCaseStudy(res.data?.data || res.data)

            } catch (error) {
                console.log('Error details:', {
                    message: error.message,
                    status: error.response?.status,
                    data: error.response?.data
                });
            } finally {
                setLoading(false);
            }
        }

        fetchCaseStudy();

    }, [id])

    if (loading) {
        return (
            <div>
                <p className=''>Loading... </p>
            </div>
        )
    }

    const imageSrc = caseStudy.image?.length > 0
        ? `http://localhost:5000/uploads/caseStudies/${caseStudy.image[0]}`
        : null

    // console.log('Case Study:', caseStudy);
    // console.log('Image Array:', caseStudy.image);
    // console.log('Image Source:', imageSrc);



    return (
        <>



            <div>
                <Breadcrumb />

            </div>

            <div className='max-w-7xl mx-auto p-6'>

                <div className='lg:max-w-350 lg:mx-50'>

                    {imageSrc && (
                        <img
                            src={imageSrc}
                            alt="Case Study"
                            className="w-full max-w-2xl mx-auto mb-6"
                            onError={(e) => {
                                console.log('Image failed to load:', imageSrc);
                                e.target.style.display = 'none';
                            }}
                        // onLoad={() => console.log('Image loaded successfully:', imageSrc)}
                        />
                    )}

                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold">
                            {caseStudy.title}

                        </h1>
                        <p className="text-lg text-white rounded-lg p-2 my-2 bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] inline">
                            #{caseStudy.tag}

                        </p>
                        <div className="prose max-w-none py-5">
                            <p className="whitespace-pre-line">{caseStudy.description}</p>
                        </div>
                        <p className="text-sm text-gray-500">Posted On : {new Date(caseStudy.created_at).toLocaleDateString()}</p>
                    </div>



                </div>

                <div className='lg:max-w-350 lg:mx-50 my-15'>

                    <div>
                        <h3 className='text-3xl font-semibold'>
                            Why Your Business Needs IT Solutions Now
                        </h3>

                        <p className='my-5'>
                            Investing in IT solutions is crucial for businesses aiming thrive in a competitive solution landscape. These solutions not only streamline operations and enhance efficiency but significantly reduce costs, enabling companies to allocate resources more effectively.
                        </p>

                    </div>


                    <div className='grid grid-cols-3 gap-5'>

                        <div className=' gap-3 items-center p-2 bg-[#eff1ff] inline-flex rounded-lg'>

                            <p className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white inline-block rounded-full p-2'>
                                <FaCheck className='' />
                            </p>

                            <h2>

                                Increased Efficiency
                            </h2>
                        </div>

                        <div className=' gap-3 items-center p-2 bg-[#eff1ff] inline-flex rounded-lg'>

                            <p className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white inline-block rounded-full p-2'>
                                <FaCheck className='' />
                            </p>

                            <h2>

                                Enhanced Security                            </h2>
                        </div>

                        <div className=' gap-3 items-center p-2 bg-[#eff1ff] inline-flex rounded-lg'>

                            <p className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white inline-block rounded-full p-2'>
                                <FaCheck className='' />
                            </p>

                            <h2>

                                Business Continuity
                            </h2>
                        </div>

                        <div className=' gap-3 items-center p-2 bg-[#eff1ff] inline-flex rounded-lg'>

                            <p className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white inline-block rounded-full p-2'>
                                <FaCheck className='' />
                            </p>

                            <h2>

                                Access To Expertise
                            </h2>
                        </div>

                        <div className=' gap-3 items-center p-2 bg-[#eff1ff] inline-flex rounded-lg'>

                            <p className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white inline-block rounded-full p-2'>
                                <FaCheck className='' />
                            </p>

                            <h2>

                                Custom It Solutions
                            </h2>
                        </div>


                        <div className=' gap-3 items-center p-2 bg-[#eff1ff] inline-flex rounded-lg'>

                            <p className='bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] text-white inline-block rounded-full p-2'>
                                <FaCheck className='' />
                            </p>

                            <h2>

                                Seamless Integration
                            </h2>
                        </div>



                    </div>

                    <div className='my-10 '>

                        <h2 className='mb-5 text-3xl font-semibold'>
                            Maximize Efficiency Security with IT Solutions

                        </h2>

                        <p className='text-gray-600'>
                            The flexibility and scalability of modern IT infrastructure allow organizations to adapt to changing market demands quickly, ensuring they remain agile responsive. By leveraging data-driven insights, companies can make informed decisions that best drive growth.
                        </p>




                    </div>

                    <div className='mt-5 bg-[#d4e7fb] p-5 rounded-lg'>

                        <div className='mb-4'>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='font-medium text-gray-700'>IT Solution</p>
                                <span className='text-sm font-semibold text-blue-800'>98%</span>
                            </div>
                            <div className='w-full bg-gray-200 rounded-full h-3'>
                                <div className='bg-gradient-to-r from-blue-600 to-blue-800 h-3 rounded-full transition-all duration-500' style={{ width: '98%' }}></div>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='font-medium text-gray-700'>Cyber Security</p>
                                <span className='text-sm font-semibold text-blue-800'>99%</span>
                            </div>
                            <div className='w-full bg-gray-200 rounded-full h-3'>
                                <div className='bg-gradient-to-r from-blue-600 to-blue-800 h-3 rounded-full transition-all duration-500' style={{ width: '99%' }}></div>
                            </div>
                        </div>

                        <div className='mb-2'>
                            <div className='flex justify-between items-center mb-2'>
                                <p className='font-medium text-gray-700'>Cloud Solution</p>
                                <span className='text-sm font-semibold text-blue-800'>99%</span>
                            </div>
                            <div className='w-full bg-gray-200 rounded-full h-3'>
                                <div className='bg-gradient-to-r from-blue-600 to-blue-800 h-3 rounded-full transition-all duration-500' style={{ width: '99%' }}></div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>








        </>
    )
}

export default CaseStudySingle
