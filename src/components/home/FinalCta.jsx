// src/components/home/FinalCta.jsx
import React from 'react';
import { useListingType } from '../../context/ListingTypeContext';

const FinalCta = () => {
  const { setListingType } = useListingType();
  
  // Handle smooth scroll to sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleTenantClick = () => {
    setListingType('rent');
    scrollToSection('properties');
  };

  const handleBuyerClick = () => {
    setListingType('buy');
    scrollToSection('properties');
  };

  const handleAppClick = () => {
    // Get The App button - scroll to download section or handle app download
    scrollToSection('download');
  };

  // CTA cards data
  const ctaCards = [
    {
      id: 'tenant',
      icon: 'fas fa-home',
      title: 'Find Your Home',
      description: 'Browse verified properties with professional management and secure payments',
      buttonText: 'Browse Properties',
      buttonIcon: 'fas fa-arrow-right',
      buttonType: 'primary',
      onClick: handleTenantClick
    },
    {
      id: 'buyer',
      icon: 'fas fa-home',
      title: 'Buy Property',
      description: 'Discover verified homes and properties for sale with transparent pricing and trusted agents.',
      buttonText: 'Explore Properties',
      buttonIcon: 'fas fa-arrow-right',
      buttonType: 'accent',
      onClick: handleBuyerClick
    },
    {
      id: 'app',
      icon: 'fas fa-mobile-alt',
      title: 'Get The App',
      description: 'Manage everything on the go with our mobile app for tenants and students',
      buttonText: 'Download App',
      buttonIcon: 'fas fa-download',
      buttonType: 'secondary',
      onClick: handleAppClick
    }
  ];

  return (
    <section className="final-cta pt-24 bg-gradient-to-br from-[#f8f9fa] to-white">
      <div className="container max-w-[1200px] mx-auto px-8">
        <div className="cta-content text-center">
          
          {/* Main Heading */}
          <div className="cta-heading mb-20 max-w-2xl mx-auto">
            <h2 className="text-5xl font-black text-[#0E1F42] mb-6 leading-tight">
              Start Your Rental Journey Today
            </h2>
            <p className="text-xl text-[#6c757d] leading-relaxed">
              Join the DomiHive community and experience rental management done right
            </p>
          </div>

          {/* CTA Cards - Same styling as About.jsx */}
          <div className="cta-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {ctaCards.map((card) => (
              <div 
                key={card.id}
                className="cta-card bg-white p-10 rounded-3xl text-center shadow-lg transition-all duration-400 hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden group"
              >
                {/* Top accent border on hover - Same as About.jsx */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9F7539] to-[#0E1F42] transform scale-x-0 transition-transform duration-400 group-hover:scale-x-100"></div>
                
                {/* Card Icon - Same animations as About.jsx */}
                <div className="card-icon w-24 h-24 bg-gradient-to-br from-[#0E1F42] to-[#1a2d5f] rounded-full flex items-center justify-center mx-auto mb-8 transition-all duration-400 group-hover:bg-gradient-to-br group-hover:from-[#9F7539] group-hover:to-[#b58a4a] group-hover:scale-110 group-hover:rotate-3">
                  <i className={`${card.icon} text-3xl text-white transition-all duration-400`}></i>
                </div>
                
                {/* Card Content */}
                <h3 className="text-2xl font-bold text-[#0E1F42] mb-4">
                  {card.title}
                </h3>
                <p className="text-[#6c757d] leading-relaxed mb-6">
                  {card.description}
                </p>
                
                {/* Card Button */}
                <button 
                  onClick={card.onClick}
                  className={`card-btn w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 group ${
                    card.buttonType === 'primary' 
                      ? 'bg-[#0E1F42] text-white hover:bg-[#1a2d5f] hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#0E1F42]/30' 
                      : card.buttonType === 'accent'
                      ? 'bg-[#9F7539] text-white hover:bg-[#b58a4a] hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#9F7539]/30'
                      : 'bg-transparent text-[#0E1F42] border-2 border-[#0E1F42] hover:bg-[#0E1F42] hover:text-white hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#0E1F42]/20'
                  }`}
                >
                  {card.buttonText}
                  <i className={`${card.buttonIcon} transition-transform duration-300 group-hover:translate-x-1`}></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;