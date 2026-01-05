import { useNavigate } from 'react-router-dom'
import React from 'react'
import Breadcrumb from '../components/BreadCrumb'
import { MdArrowOutward } from 'react-icons/md'

function PageNotFound() {

    const navigate = useNavigate()

    return (
        < >
            <div>
                <Breadcrumb />
            </div>

            <div className='flex justify-center items-center '>

                <div className='text-center'>
                    <img src="/images/error.png" alt="" className='w-200 mx-auto' />

                </div>

            </div>

            <div className='flex flex-col items-center justify-center  text-center'>


                <div>
                    <h2 className='text-4xl font-bold py-5'>
                        Oops!! Page Not Found
                    </h2>
                </div>

                <div>

                    <p className='w-80 py-5 text-gray-600'>

                        While you're here, why not check out some of our top-notch web hosting
                        services? Whether you're just starting a new website or looking to upgrade
                        your current hosting, we offer solutions tailored to your needs.
                    </p>
                </div>

                <div  >

                    <button className='flex items-center gap-5 bg-linear-to-r from-[#300B9BFF] to-[#665CEAFF] hover:bg-linear-to-r hover:from-[#665CEAFF] hover:to-[#300B9BFF]  text-white group p-4 rounded-lg text-xl leading-relaxed'
                        onClick={() => navigate('/')}
                    >
                        Back To HomePage <MdArrowOutward className='text-2xl group-hover:rotate-45 transition-all duration-00' />
                    </button>

                </div>

            </div>

        </>
    )
}

export default PageNotFound
