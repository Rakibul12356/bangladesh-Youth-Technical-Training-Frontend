import React, { useState } from 'react'

const MENU_ITEMS = [
  'Home',
  'Courses',
  'Verified Institutes',
  'Success Students',
  'Student Result',
  'Institute Apply',
  'Institute Login',
  'Notice',
  'Contact Us',
]

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-xl font-semibold text-gray-900">BTEB</div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            {MENU_ITEMS.map((label) => (
              <a
                key={label}
                href={`#${label.replace(/\s+/g, '-').toLowerCase()}`}
                className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
            >
              <span className="sr-only">Open main menu</span>
              <span className="block w-5 h-0.5 bg-current mb-1" />
              <span className="block w-5 h-0.5 bg-current mb-1" />
              <span className="block w-5 h-0.5 bg-current" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {open && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1" id="mobile-menu">
          {MENU_ITEMS.map((label) => (
            <a
              key={label}
              href={`#${label.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar