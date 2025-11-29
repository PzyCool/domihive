// src/components/home/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/domihive-logo-2.png';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', path: '/#home' },
    { id: 'features', label: 'About', path: '/#features' },
    { id: 'properties', label: 'Properties', path: '/#properties' },
    { id: 'process-section', label: 'How It Works', path: '/#process-section' },
  ];

  const authItems = [
    { label: 'Sign up', path: '/signup' },
    { label: 'Log in', path: '/login' },
  ];

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'properties', 'process-section'];
      
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle smooth scroll for hash links
  const handleNavClick = (e, path) => {
    if (path.includes('#')) {
      e.preventDefault();
      const hash = path.split('#')[1];
      const element = document.getElementById(hash);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        setActiveSection(hash);
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-4 transition-all duration-300">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between py-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 relative">
          <div className="relative group">
            <Link to="/">
              <img 
                src={logo} 
                alt="DomiHive" 
                className="h-[35px] w-auto transition-all duration-300 rounded-[5px]"
              />
            </Link>
            <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 translate-y-[10px] bg-[#0E1F42] text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 pointer-events-none z-50">
              DomiHive
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={(e) => handleNavClick(e, item.path)}
              className={`relative px-4 py-2 rounded-[5px] font-medium transition-all duration-300 flex items-center gap-2 ${
                activeSection === item.id
                  ? 'text-[#9F7539] font-semibold'
                  : 'text-[#343a40] hover:text-[#9F7539] hover:bg-[#f8f9fa]'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 w-[80%] h-0.5 bg-[#9F7539] transition-all duration-300"></span>
              )}
            </Link>
          ))}

          {/* Vertical Separator */}
          <div className="w-px h-[30px] bg-[#6c757d] opacity-30"></div>

          {/* Auth Links */}
          {authItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="px-4 py-2 rounded-[5px] font-medium text-[#343a40] hover:text-[#9F7539] hover:bg-[#f8f9fa] transition-all duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden bg-transparent border-none text-2xl text-[#0E1F42] cursor-pointer transition-all duration-300"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMobileMenu}
          ></div>
        )}

        {/* Mobile Menu */}
        <div className={`
          fixed top-0 left-0 h-full w-80 max-w-full bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out md:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full pt-20 px-6">
            
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-2xl text-gray-600 hover:text-[#9F7539] transition-colors duration-300"
              onClick={toggleMobileMenu}
            >
              <i className="fas fa-times"></i>
            </button>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={(e) => {
                    handleNavClick(e, item.path);
                    toggleMobileMenu();
                  }}
                  className={`relative text-lg font-medium py-3 px-4 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-[#9F7539] font-semibold'
                      : 'text-[#343a40] hover:text-[#9F7539] hover:bg-[#f8f9fa]'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80%] h-0.5 bg-[#9F7539] transition-all duration-300"></span>
                  )}
                </Link>
              ))}

              {/* Mobile Auth Links */}
              <div className="pt-6 mt-4 border-t border-gray-200">
                {authItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={toggleMobileMenu}
                    className="block text-lg font-medium py-3 px-4 rounded-lg text-[#343a40] hover:text-[#9F7539] hover:bg-[#f8f9fa] transition-all duration-300 mb-2"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Footer */}
            <div className="mt-auto pb-8">
              <div className="text-center text-gray-500 text-sm">
                <p>Professional Property Management</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;