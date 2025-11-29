// components/home/layout/Header.jsx
import React from 'react'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 py-4 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="relative group">
            <img 
              src="/src/assets/domihive-logo 2.png" 
              alt="DomiHive" 
              className="h-10 w-auto rounded transition-all duration-300" 
            />
            <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 translate-y-2 bg-gray-900 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
              DomiHive
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-gray-800 font-medium px-4 py-2 rounded-lg hover:text-amber-700 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 relative group">
            Home
            <span className="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-4/5"></span>
          </a>
          <a href="#features" className="text-gray-800 font-medium px-4 py-2 rounded-lg hover:text-amber-700 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 relative group">
            About
            <span className="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-4/5"></span>
          </a>
          <a href="#properties" className="text-gray-800 font-medium px-4 py-2 rounded-lg hover:text-amber-700 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 relative group">
            Properties
            <span className="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-4/5"></span>
          </a>
          <a href="#process-section" className="text-gray-800 font-medium px-4 py-2 rounded-lg hover:text-amber-700 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 relative group">
            How It Works
            <span className="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-4/5"></span>
          </a>
          
          {/* Vertical Separator */}
          <div className="w-px h-8 bg-gray-300 opacity-30"></div>

          {/* Auth Links */}
          <a href="/signup" className="text-gray-800 font-medium px-4 py-2 rounded-lg hover:text-amber-700 hover:bg-gray-50 transition-all duration-300">
            Sign up
          </a>
          <a href="/login" className="text-gray-800 font-medium px-4 py-2 rounded-lg hover:text-amber-700 hover:bg-gray-50 transition-all duration-300">
            Log in
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden bg-transparent border-none text-2xl text-gray-900 cursor-pointer hover:text-amber-700 transition-colors duration-300">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </header>
  )
}

export default Header