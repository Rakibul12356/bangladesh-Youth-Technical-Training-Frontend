import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} BTEB. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer