import React from 'react'

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p className="text-gray-700">You do not have permission to view this page.</p>
        <p className="text-gray-700 mt-2">Please log in with appropriate credentials or contact support.</p>
        <a href="/login" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Go to Login
        </a>
      </div>
    </div>
  )
}

export default UnauthorizedPage