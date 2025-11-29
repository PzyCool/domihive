// src/components/home/About.jsx
import React from 'react';

const About = () => {
  // Features data - exact same as original
  const features = [
    {
      id: 1,
      icon: 'fas fa-check-circle',
      title: 'Verified Properties',
      description: 'Every listing is personally verified by our team. No fake listings, no surprises - just quality homes you can trust.'
    },
    {
      id: 2,
      icon: 'fas fa-shield-alt',
      title: 'Escrow Protection',
      description: 'Your funds are held securely in escrow until you confirm satisfaction. Complete financial protection guaranteed.'
    },
    {
      id: 3,
      icon: 'fas fa-tools',
      title: 'Full Management',
      description: 'We handle maintenance, payments, and communication. Focus on living while we manage the details.'
    },
    {
      id: 4,
      icon: 'fas fa-home',
      title: 'Buyer-Focused',
      description: 'Tailored property options for buyers, offering verified listings, transparent pricing, and expert support through the purchase process.'
    },
    {
      id: 5,
      icon: 'fas fa-mobile-alt',
      title: 'Digital Dashboard',
      description: 'Manage everything from payments to maintenance requests through our easy-to-use online platform.'
    },
    {
      id: 6,
      icon: 'fas fa-headset',
      title: 'Professional Support',
      description: 'Dedicated property managers and 24/7 emergency support. We\'re here when you need us.'
    }
  ];

  return (
    <section id="features" className="features-section py-24 bg-gradient-to-br from-[#f8f9fa] to-white">
      <div className="container max-w-[1200px] mx-auto px-8">
        
        {/* Section Header - Exact same as original */}
        <div className="section-header text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0E1F42] mb-4">
            Why Choose DomiHive?
          </h2>
          <p className="text-xl text-[#6c757d] max-w-2xl mx-auto leading-relaxed">
            Professional property management that puts your peace of mind first
          </p>
        </div>

        {/* Features Grid - Exact same layout as original CSS */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="feature-card bg-white p-8 rounded-xl text-center shadow-lg transition-all duration-400 hover:-translate-y-3 hover:shadow-2xl relative overflow-hidden group"
            >
              {/* Top accent border on hover - EXACT SAME AS ORIGINAL */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9F7539] to-[#0E1F42] transform scale-x-0 transition-transform duration-400 group-hover:scale-x-100"></div>
              
              {/* Feature Icon - EXACT SAME ANIMATIONS */}
              <div className="feature-icon w-20 h-20 bg-gradient-to-br from-[#0E1F42] to-[#1a2d5f] rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-400 group-hover:bg-gradient-to-br group-hover:from-[#9F7539] group-hover:to-[#b58a4a] group-hover:scale-110 group-hover:rotate-3">
                <i className={`${feature.icon} text-2xl text-white transition-all duration-400`}></i>
              </div>
              
              {/* Feature Content */}
              <h3 className="text-xl font-semibold text-[#0E1F42] mb-4">
                {feature.title}
              </h3>
              <p className="text-[#6c757d] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;