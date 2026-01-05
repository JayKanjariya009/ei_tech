import React, { useEffect, useState } from 'react'
import { serviceAPI } from '../../utils/api'
import { FaPen, FaPlus, FaRegEye } from 'react-icons/fa'
import { ImBin2 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ConfirmModal from '../../components/ConfirmModal'

function Services() {
    const [services, setServices] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [serviceToDelete, setServiceToDelete] = useState(null)
    const navigate = useNavigate()

    const handleDeleteService = async (id, title) => {
        setServiceToDelete({ id, title })
        setShowConfirmModal(true)
    }

    const confirmDelete = async () => {
        if (!serviceToDelete) return
        
        setLoading(true)
        setShowConfirmModal(false)
        
        try {
            const response = await serviceAPI.removeService(serviceToDelete.id)
            console.log('Delete response:', response)
            toast.success("Service deleted successfully!")
            await fetchServices(currentPage)
        } catch (error) {
            console.error('Error deleting service:', error)
            const errorMessage = error.response?.data?.message || error.message || 'Failed to delete service'
            toast.error(`Error: ${errorMessage}`)
        } finally {
            setLoading(false)
            setServiceToDelete(null)
        }
    }

    const cancelDelete = () => {
        setShowConfirmModal(false)
        setServiceToDelete(null)
    }

    const fetchServices = async (page = 1) => {
        setLoading(true)
        try {
            const response = await serviceAPI.getServices(page, 6)
            console.log('Services response:', response.data);
            
            setServices(response.data.services || []);
            setTotalPages(response.data.pagination?.totalPages || 1);
            setCurrentPage(page);
        } catch (error) {
            console.log('Error fetching services:', error)
            setServices([]);
            setTotalPages(1);
            toast.error('Failed to fetch services. Please try again.');
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchServices()
    }, [])

    return (
        <>
            <div className='max-w-7xl p-2 sm:p-4 font-semibold flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0'>
                <div className='mr-auto'>
                    <h1 className='text-lg sm:text-xl'>Services Management</h1>
                    <p className='text-xs sm:text-sm text-gray-600 font-normal'>
                        {loading ? 'Loading...' : `${services.length} service${services.length !== 1 ? 's' : ''} found`}
                    </p>
                </div>
                <div>
                    <button className='bg-green-500 p-2 sm:p-3 m-1 sm:m-3 rounded flex items-center gap-2 sm:gap-3 text-white hover:bg-green-600 transition-colors text-sm sm:text-base'
                        onClick={() => { navigate("/newservice") }}
                        disabled={loading}
                    >
                        <span className='hidden sm:inline'>Create New Service</span>
                        <span className='sm:hidden'>New Service</span>
                        <FaPlus />
                    </button>
                </div>
            </div>

            <div>
                <div className='bg-gray-200 p-1 sm:p-2'>
                    {loading ? (
                        <div className='text-center p-4 sm:p-8'>
                            <div className='inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-500'></div>
                            <p className='mt-2 text-sm sm:text-base'>Loading services...</p>
                        </div>
                    ) : services && services.length > 0 ? services.map((service) => (
                        <div key={service.id} className='flex flex-col sm:flex-row items-start sm:items-center bg-white p-2 sm:p-3 m-2 sm:m-4 rounded-lg shadow-md gap-2 sm:gap-0'>
                            <div className='p-2 sm:p-3 items-center'>
                                <h1 className='p-2 sm:p-3 bg-gray-300 rounded text-sm sm:text-base'>
                                    {service.id}
                                </h1>
                            </div>

                            <div className='flex-1 min-w-0'>
                                <h2 className='text-lg sm:text-xl font-bold truncate'>{service.title}</h2>
                                <p className='text-gray-600 line-clamp-2 sm:line-clamp-1 p-1 text-sm sm:text-base'>{service.description}</p>
                            </div>

                            <div className='flex gap-2 sm:gap-4 ml-auto'>
                                <FaRegEye 
                                    className='bg-blue-400 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-blue-500 transition-colors'
                                    onClick={() => { navigate(`/services/${service.id}`) }}
                                    title="View Service"
                                />
                                <FaPen 
                                    className='bg-green-400 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-green-500 transition-colors'
                                    onClick={() => { navigate(`/services/edit/${service.id}`) }}
                                    title="Edit Service"
                                />
                                <ImBin2 
                                    className={`bg-red-500 p-1.5 sm:p-2 text-2xl sm:text-3xl rounded cursor-pointer hover:bg-red-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => !loading && handleDeleteService(service.id, service.title)}
                                    title="Delete Service"
                                />
                            </div>
                        </div>
                    )) : (
                        <div className='text-center p-4'>
                            <p className='text-sm sm:text-base'>No services found.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className='flex justify-center gap-2 p-2 sm:p-4'>
                    <button
                        onClick={() => fetchServices(currentPage - 1)}
                        disabled={currentPage === 1 || loading}
                        className='px-2 sm:px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors text-sm sm:text-base'
                    >
                        <span className='hidden sm:inline'>Previous</span>
                        <span className='sm:hidden'>Prev</span>
                    </button>
                    <span className='px-2 sm:px-3 py-1 text-sm sm:text-base'>{currentPage} of {totalPages}</span>
                    <button
                        onClick={() => fetchServices(currentPage + 1)}
                        disabled={currentPage === totalPages || loading}
                        className='px-2 sm:px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors text-sm sm:text-base'
                    >
                        Next
                    </button>
                </div>
            </div>

            <ConfirmModal
                isOpen={showConfirmModal}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="Delete Service"
                message={serviceToDelete ? `Are you sure you want to delete "${serviceToDelete.title}"? This action cannot be undone.` : ""}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </>
    )
}

export default Services