import React from 'react'
import { useNavigate } from 'react-router-dom'

function BackButton() {
    const navigate = useNavigate()

    return (
        <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
            ← Back
        </button>
    )
}

export default BackButton