import React, { useState, useEffect } from 'react'
import { testimonialAPI } from '../../utils/api'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'

function EditTestimonial() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [testimonial, setTestimonial] = useState({
    user_name: "",
    user_email: "",
    message: "",
    rating: 5,
    status: "pending"
  })

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const BASE_URL = "http://localhost:5000/uploads";

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await testimonialAPI.getSingleTestimonial(id)
        const data = response.data
        setTestimonial({
          user_name: data.user_name || "",
          user_email: data.user_email || "",
          message: data.message || "",
          rating: data.rating || 5,
          status: data.status || "pending"
        })
        setExistingImages(data.image || [])
      } catch (error) {
        console.error('Error fetching testimonial:', error)
      }
    }
    fetchTestimonial()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestimonial(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('user_name', testimonial.user_name);
    formData.append('user_email', testimonial.user_email);
    formData.append('message', testimonial.message);
    formData.append('rating', testimonial.rating);
    formData.append('status', testimonial.status);

    images.forEach((img) => {
      formData.append('images', img);
    });

    // Debug: Log what we're sending
    console.log('Sending data:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await testimonialAPI.editTestimonial(id, formData);
      console.log('Response:', response);
      alert("Testimonial updated successfully!");
      navigate('/testimonials');
    } catch (error) {
      console.error('Error updating testimonial:', error);
      console.error('Error response:', error.response?.data);
      alert('Failed to update testimonial. Please try again.');
    }
  }

  return (
    <>
      <BackButton />
      <div className='max-w-4xl mx-auto p-2 sm:p-4'>
        <div className='bg-white rounded-lg shadow-lg p-4 sm:p-6'>
          <h1 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>Edit Testimonial</h1>
          
          <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
            <div>
              <label className='block mb-2 font-semibold text-sm sm:text-base'>Testimonial Images:</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages([...e.target.files])}
                className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mt-3">
                {existingImages.map((img, i) => (
                  <div key={i} className='relative'>
                    <img
                      src={`${BASE_URL}/testimonials/${img}`}
                      className="w-full h-32 sm:h-40 object-cover rounded border"
                      alt="Existing"
                    />
                    <span className='absolute top-1 left-1 bg-blue-500 text-white text-xs px-1 rounded'>Existing</span>
                  </div>
                ))}
                {images.map((file, i) => (
                  <div key={i} className='relative'>
                    <img
                      src={URL.createObjectURL(file)}
                      className="w-full h-32 sm:h-40 object-cover rounded border"
                      alt="New"
                    />
                    <span className='absolute top-1 left-1 bg-green-500 text-white text-xs px-1 rounded'>New</span>
                  </div>
                ))}
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block mb-2 font-semibold text-sm sm:text-base'>User Name:</label>
                <input type="text"
                  name="user_name"
                  placeholder='User Name'
                  value={testimonial.user_name}
                  onChange={handleChange}
                  className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                  required
                />
              </div>

              <div>
                <label className='block mb-2 font-semibold text-sm sm:text-base'>User Email:</label>
                <input type="email"
                  name="user_email"
                  placeholder='User Email'
                  value={testimonial.user_email}
                  onChange={handleChange}
                  className='w-full bg-gray-100 p-2 sm:p-3 rounded border text-sm sm:text-base'
                  required
                />
              </div>
            </div>

            <div>
              <label className='block mb-2 font-semibold text-sm sm:text-base'>Testimonial Message:</label>
              <textarea
                name="message"
                placeholder='Testimonial Message'
                onChange={handleChange}
                value={testimonial.message}
                className='w-full bg-gray-100 p-2 sm:p-3 rounded border min-h-20 sm:min-h-24 text-sm sm:text-base'
                rows={4}
                required
              />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block mb-2 font-semibold text-sm sm:text-base'>Rating:</label>
                <select
                  name='rating'
                  value={testimonial.rating}
                  onChange={handleChange}
                  className='w-full p-2 sm:p-3 bg-gray-100 rounded border text-sm sm:text-base'
                >
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>

              <div>
                <label className='block mb-2 font-semibold text-sm sm:text-base'>Status:</label>
                <select
                  name='status'
                  value={testimonial.status}
                  onChange={handleChange}
                  className='w-full p-2 sm:p-3 bg-gray-100 rounded border text-sm sm:text-base'
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                </select>
              </div>
            </div>

            <button type='submit'
              className='w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white p-2 sm:p-3 px-4 sm:px-6 rounded transition-colors text-sm sm:text-base'
            >
              Update Testimonial
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditTestimonial
