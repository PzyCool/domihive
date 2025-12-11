// src/components/home/layout/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/domihive-logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Newsletter subscription:', email);
      setIsSuccess(true);
      setEmail('');
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Social media links
  const socialLinks = [
    { icon: 'fab fa-linkedin', url: 'https://linkedin.com/company/domihive', title: 'LinkedIn', color: 'text-[#f8f9fa]' },
    { icon: 'fab fa-youtube', url: 'https://youtube.com/c/domihive', title: 'YouTube', color: 'text-[#f8f9fa]' },
    { icon: 'fab fa-facebook', url: 'https://www.facebook.com/profile.php?id=61584608503599', title: 'Facebook', color: 'text-[#f8f9fa]' },
    { icon: 'fab fa-instagram', url: 'https://instagram.com/domihiveofficial', title: 'Instagram', color: 'text-[#f8f9fa]' },
    { icon: 'fab fa-twitter', url: 'https://x.com/domihiveofcl', title: 'Twitter', color: 'text-[#f8f9fa]' },
  ];

  // Quick links structure
  const quickLinks = {
    platform: {
      title: 'Platform',
      links: [
        { label: 'Home', path: '/#home' },
        { label: 'About', path: '/#features' },
        { label: 'Properties', path: '/#properties' },
        { label: 'How It Works', path: '/#process-section' },
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { label: 'Blog', path: '/blog' },
        { label: 'Rental Guides', path: '/guides' },
        { label: 'FAQ', path: '/faq' },
        { label: 'Help Center', path: '/help' },
      ]
    },
    company: {
      title: 'Company',
      links: [
        { label: 'Careers', path: '/careers' },
        { label: 'Partners', path: '/partners' },
        { label: 'News & Updates', path: '/news' },
      ]
    }
  };

  // Legal links
  const legalLinks = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Cookie Policy', path: '/cookies' },
  ];

  // Handle smooth scroll for hash links
  const handleLinkClick = (e, path) => {
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
      }
    }
  };

  return (
    <footer className="main-footer bg-gradient-to-br from-[#0E1F42] to-[#1a2d5f] text-white pt-8 pb-6 mt-20 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9F7539] to-transparent"></div>
      
      <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Content - RESPONSIVE GRID */}
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1.5fr_1fr] gap-8 lg:gap-12 mb-8 lg:mb-10 pt-6 lg:pt-8">
          
          {/* Brand & Description Section */}
          <div className="footer-section brand-section flex flex-col gap-4 lg:gap-6 order-1 lg:order-1">
            <div className="footer-logo flex justify-center lg:justify-start">
              <img 
                src={logo} 
                alt="DomiHive" 
                className="h-8 lg:h-10 w-auto mb-3 lg:mb-4"
              />
            </div>
            
            <div className="company-description text-center lg:text-left">
              <p className="text-white text-opacity-90 leading-relaxed text-sm lg:text-[0.95rem]">
                <strong className="text-[#9F7539]">DomiHive</strong> is a flagship property management platform designed to make rental experiences secure and hassle-free for Nigerians.
              </p>
            </div>
            
            <div className="contact-info flex flex-col gap-2 lg:gap-3">
              <div className="contact-item flex items-center gap-3 transition-all duration-300 hover:translate-x-1 justify-center lg:justify-start">
                <i className="fas fa-envelope text-[#9F7539] text-sm lg:text-base w-4"></i>
                <a 
                  href="mailto:support@mydomihive.com" 
                  className="text-white text-opacity-90 text-xs lg:text-[0.9rem] hover:text-[#9F7539] transition-colors duration-300"
                >
                  support@mydomihive.com
                </a>
              </div>
              
              <div className="contact-item flex items-center gap-3 transition-all duration-300 hover:translate-x-1 justify-center lg:justify-start">
                <i className="fas fa-phone text-[#9F7539] text-sm lg:text-base w-4"></i>
                <a 
                  href="tel:+2348000000000" 
                  className="text-white text-opacity-90 text-xs lg:text-[0.9rem] hover:text-[#9F7539] transition-colors duration-300"
                >
                  +234 800 000 0000
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Section - RESPONSIVE LAYOUT */}
          <div className="footer-section links-section flex justify-center order-3 lg:order-2 lg:pt-4">
            <div className="links-grid grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full max-w-md lg:max-w-none">
              {Object.entries(quickLinks).map(([key, section]) => (
                <div key={key} className="link-group text-center lg:text-left">
                  <h5 className="text-base lg:text-[1.1rem] font-bold mb-4 lg:mb-5 text-white relative pb-2">
                    {section.title}
                    <span className="absolute bottom-0 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 w-8 h-0.5 bg-[#9F7539] rounded"></span>
                  </h5>
                  
                  <ul className="space-y-2 lg:space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link 
                          to={link.path}
                          onClick={(e) => handleLinkClick(e, link.path)}
                          className="text-white text-opacity-80 text-xs lg:text-[0.9rem] hover:text-white transition-all duration-300 relative pl-0 hover:pl-3 lg:hover:pl-3 group block py-1"
                        >
                          <span className="absolute left-0 opacity-0 transition-all duration-300 group-hover:opacity-100">›</span>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Social & Newsletter Section - RESPONSIVE LAYOUT */}
          <div className="footer-section social-section flex flex-col gap-6 lg:gap-8 order-2 lg:order-3 lg:pt-4">
            
            {/* Social Media */}
            <div className="social-media text-center lg:text-left">
              <h5 className="text-base lg:text-[1.1rem] font-bold mb-3 lg:mb-4 text-white">Follow Us</h5>
              <div className="social-links flex gap-2 lg:gap-3 flex-wrap justify-center lg:justify-start">
                {socialLinks.map((social) => (
                  <a
                    key={social.title}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link w-9 h-9 lg:w-11 lg:h-11 bg-transparent rounded-lg lg:rounded-xl flex items-center justify-center text-white border border-[#6c757d] transition-all duration-300 hover:bg-[#9F7539] hover:border-[#9F7539] hover:scale-105 hover:shadow-lg hover:shadow-[#9F7539]/30"
                    title={social.title}
                  >
                    <i className={`${social.icon} text-base lg:text-lg ${social.color}`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="newsletter text-center lg:text-left">
              <h5 className="text-base lg:text-[1.1rem] font-bold mb-3 lg:mb-4 text-white">Stay Updated</h5>
              <p className="text-white text-opacity-80 text-xs lg:text-[0.9rem] mb-3 lg:mb-4 leading-relaxed">
                Get the latest news and property updates
              </p>
              
              <form 
                onSubmit={handleNewsletterSubmit}
                className="newsletter-form flex flex-col sm:flex-row gap-2 relative max-w-xs mx-auto lg:mx-0 lg:max-w-none"
              >
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-3 lg:px-4 py-2 lg:py-3 rounded-lg border border-[#6c757d] bg-transparent text-white placeholder-white placeholder-opacity-80 text-sm transition-all duration-300 focus:outline-none focus:border-[#9F7539] focus:shadow-lg focus:shadow-[#9F7539]/20"
                  disabled={isSubmitting}
                />
                
                <button 
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="px-4 py-2 lg:py-3 bg-[#9F7539] text-white rounded-lg cursor-pointer transition-all duration-300 min-w-[50px] flex items-center justify-center hover:bg-[#b58a4a] hover:scale-105 hover:shadow-lg hover:shadow-[#9F7539]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm lg:text-base"
                >
                  {isSubmitting ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fas fa-paper-plane"></i>
                  )}
                </button>

                {/* Success Message */}
                {isSuccess && (
                  <div className="absolute -bottom-6 lg:-bottom-8 left-0 right-0 text-green-400 text-xs text-center animate-bounce">
                    <i className="fas fa-check-circle mr-1"></i>
                    Subscribed successfully!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom - RESPONSIVE */}
        <div className="footer-bottom mt-8 lg:mt-10">
          {/* Divider */}
          <div className="footer-divider h-px bg-gradient-to-r from-transparent via-white via-opacity-20 to-transparent mb-4 lg:mb-6"></div>
          
          <div className="bottom-content flex flex-col-reverse sm:flex-row justify-between items-center gap-3 lg:gap-4">
            <div className="copyright text-center sm:text-left">
              <p className="text-white text-opacity-70 text-xs lg:text-[0.85rem]">
                &copy; 2025 DomiHive. A product of BBW Tech Innovations. All rights reserved.
              </p>
            </div>
            
            <div className="legal-links flex gap-4 lg:gap-6 flex-wrap justify-center">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-white text-opacity-70 text-xs lg:text-[0.85rem] hover:text-[#9F7539] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#9F7539] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;