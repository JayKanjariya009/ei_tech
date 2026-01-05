import React from 'react'
import BackButton from '../../components/BackButton'

function CreateNewTestimonial() {
  return (
    <>
      <BackButton />
      <div className='max-w-4xl mx-auto p-2 sm:p-4'>
        <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
          <h1 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>Create New Testimonial</h1>
          <div className='text-center py-8 sm:py-12'>
            <p className='text-gray-500 text-sm sm:text-base'>Testimonial creation form coming soon...</p>
            <p className='text-gray-400 text-xs sm:text-sm mt-2'>This feature is under development.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateNewTestimonial
