// src/components/home/HowItWorks.jsx
import React from 'react';
import { useListingType } from "../../context/ListingTypeContext";
const HowItWorks = () => {
  const { setListingType } = useListingType();
  
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
    // Coming soon: buy journey
  };

  const processSteps = [
    {
      step: 1,
      icon: 'fas fa-search',
      title: 'Browse Verified Properties',
      description: 'Explore our carefully curated selection of professionally managed properties. Every listing is personally verified to ensure quality and authenticity.'
    },
    {
      step: 2,
      icon: 'fas fa-calendar-check',
      title: 'Book Inspection & Apply',
      description: 'Schedule a convenient viewing time and complete our streamlined application process. Get quick responses with minimal paperwork.'
    },
    {
      step: 3,
      icon: 'fas fa-shield-alt',
      title: 'Secure Payment via Escrow',
      description: 'Your funds are protected in our secure escrow system. Payment is only released after you confirm satisfaction with the property.'
    },
    {
      step: 4,
      icon: 'fas fa-home',
      title: 'Move In & Enjoy Management',
      description: 'Get your keys and settle into your new home. DomiHive handles all management aspects so you can focus on living comfortably.'
    }
  ];

  const userCards = [
    {
      user: 'tenant',
      icon: 'fas fa-home',
      title: 'For Tenants',
      badge: 'Professional',
      benefits: [
        'Verified properties with professional management',
        'Full maintenance and repair services',
        'Secure escrow payment protection',
        'Dedicated property manager support',
        'Digital rent payments and documentation'
      ],
      buttonText: 'Browse Properties',
      buttonType: 'primary',
      onClick: handleTenantClick
    },
    {
      user: 'buyer',
      icon: 'fas fa-home',
      title: 'For Buyers',
      badge: 'Coming Soon',
      benefits: [
        'We are focused on rentals right now',
        'Buying journey will launch soon',
        'Stay tuned for verified sale listings',
        'Expert guidance and secure process',
        'Transparent pricing and documentation'
      ],
      buttonText: 'Coming Soon',
      buttonType: 'accent',
      onClick: handleBuyerClick
    }
  ];

  return (
    <>
      {/* How It Works Section */}
      <section id="process-section" className="process-section py-24 bg-white">
        <div className="container max-w-[1200px] mx-auto px-8">
          
          {/* Section Header */}
          <div className="section-header text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0E1F42] mb-4">
              How DomiHive Works
            </h2>
            <p className="text-xl text-[#6c757d] max-w-2xl mx-auto leading-relaxed">
              Renting made simple with our professional managed process
            </p>
          </div>

          {/* Process Steps */}
          <div className="process-steps flex flex-col gap-16 relative">
            {/* Vertical Line - EXACT SAME AS ORIGINAL */}
            <div className="absolute top-0 bottom-0 left-16 w-0.5 bg-gradient-to-b from-[#9F7539] via-[#9F7539] via-opacity-30 to-[#9F7539] z-0"></div>
            
            {processSteps.map((step, index) => (
              <div key={step.step} className="process-step flex items-start gap-10 relative z-10">
                {/* Step Icon - EXACT SAME AS ORIGINAL */}
                <div className="step-icon w-32 h-32 bg-white border-2 border-[#9F7539] rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                  <i className={`${step.icon} text-4xl text-[#9F7539]`}></i>
                </div>
                
                {/* Step Dot - EXACT SAME AS ORIGINAL */}
                <div className="absolute left-16 top-16 w-4 h-4 bg-[#9F7539] border-4 border-white rounded-full z-20"></div>

                {/* Step Content - EXACT SAME AS ORIGINAL */}
                <div className="step-content flex-1 bg-[#f8f9fa] p-10 rounded-xl border-l-4 border-[#0E1F42]">
                  <div className="step-number text-sm font-bold text-[#0E1F42] mb-4 tracking-widest uppercase">
                    Step {step.step}
                  </div>
                  <h3 className="text-2xl font-semibold text-[#0E1F42] mb-4">
                    {step.title}
                  </h3>
                  <p className="text-[#6c757d] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Users Section */}
      <section className="users-section py-24 bg-white">
        <div className="container max-w-[1200px] mx-auto px-8">
          
          {/* Section Header */}
          <div className="section-header text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0E1F42] mb-4">
              Designed for Your Needs
            </h2>
            <p className="text-xl text-[#6c757d] max-w-2xl mx-auto leading-relaxed">
              Tailored solutions for different rental experiences
            </p>
          </div>

          {/* Users Grid - EXACT SAME AS ORIGINAL */}
          <div className="users-grid grid grid-cols-1 lg:grid-cols-2 gap-12">
            {userCards.map((user) => (
              <div key={user.user} className="user-card bg- rounded-2xl shadow-lg overflow-hidden transition-all duration-400 hover:-translate-y-3 hover:shadow-2xl group">
                
                {/* User Header - EXACT SAME AS ORIGINAL */}
                <div className="user-header p-10 text-center bg-gradient-to-br from-[#0E1F42] to-[#1a2d5f]">
                  <div className="user-icon w-20 h-20 bg-[#0E1F42] bg-opacity-5 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-400 group-hover:scale-110 group-hover:rotate-3">
                    <i className={`${user.icon} text-3xl text-white`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{user.title}</h3>
                  <div className="user-badge inline-block px-5 py-2 bg-[#0E1F42] bg-opacity-20 text-white rounded-full font-semibold text-sm">
                    {user.badge}
                  </div>
                </div>

                {/* User Content - EXACT SAME AS ORIGINAL */}
                <div className="user-content p-10">
                  <ul className="user-benefits space-y-4 mb-8">
                    {user.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-4 text-[#6c757d]">
                        <i className="fas fa-check text-[#9F7539] mt-1 flex-shrink-0"></i>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="user-cta text-center">
                    <button 
                      onClick={user.onClick}
                      className={`btn w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                        user.buttonType === 'primary' 
                          ? 'bg-[#0E1F42] text-white hover:bg-[#1a2d5f] hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#0E1F42]/30' 
                          : 'bg-[#9F7539] text-white hover:bg-[#b58a4a] hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#9F7539]/30'
                      }`}
                    >
                      {user.buttonText}
                      <i className="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Users Footer - EXACT SAME AS ORIGINAL */}
          <div className="users-footer text-center mt-12 py-6 bg-[#f8f9fa] rounded-xl border-l-4 border-[#9F7539]">
            <p className="text-[#6c757d]">
              All users enjoy our core benefits: <strong className="text-[#0E1F42]">Verified Properties</strong> • <strong className="text-[#0E1F42]">Escrow Protection</strong> • <strong className="text-[#0E1F42]">Professional Management</strong>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
