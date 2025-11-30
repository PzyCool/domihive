// src/components/home/OurSecurity.jsx
import React from 'react';

const OurSecurity = () => {
  return (
    <section id="security" className="trust-section py-24 bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      <div className="container max-w-[1200px] mx-auto px-8">
        
        {/* Section Header */}
        <div className="section-header text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0E1F42] mb-4">
            Your Security is Our Priority
          </h2>
          <p className="text-xl text-[#6c757d] max-w-2xl mx-auto leading-relaxed">
            Built on transparency and protection for every transaction
          </p>
        </div>

        {/* Trust Content */}
        <div className="trust-content grid gap-16 mb-16">
          
          {/* Main Trust Features */}
          <div className="trust-features grid gap-12">
            
            {/* Trust Feature 1 - Escrow Protection */}
            <div className="trust-feature grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 items-start">
              <div className="trust-icon w-24 h-24 bg-gradient-to-br from-[#0E1F42] to-[#1a2d5f] rounded-full flex items-center justify-center shadow-lg transition-all duration-400 hover:scale-110 hover:rotate-3">
                <i className="fas fa-lock text-3xl text-white"></i>
              </div>
              
              <div className="trust-text">
                <h3 className="text-2xl font-semibold text-[#0E1F42] mb-4">
                  Escrow Payment Protection
                </h3>
                <p className="text-[#6c757d] leading-relaxed mb-6 text-lg">
                  Your funds are held securely in our escrow system. Payment is only released from DomiHive to landlords after you confirm satisfaction with the property and complete the move-in process.
                </p>
                
                <ul className="trust-benefits bg-white p-6 rounded-xl border-l-4 border-[#9F7539] shadow-lg">
                  <li className="flex items-center gap-3 mb-3 text-[#6c757d]">
                    <i className="fas fa-shield-check text-[#9F7539] text-lg"></i>
                    <span>48-hour review period after move-in</span>
                  </li>
                  <li className="flex items-center gap-3 mb-3 text-[#6c757d]">
                    <i className="fas fa-undo text-[#9F7539] text-lg"></i>
                    <span>Full refund if not satisfied</span>
                  </li>
                  <li className="flex items-center gap-3 text-[#6c757d]">
                    <i className="fas fa-handshake text-[#9F7539] text-lg"></i>
                    <span>Funds released only after your approval</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Trust Feature 2 - Property Verification */}
            <div className="trust-feature grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 items-start">
              <div className="trust-icon w-24 h-24 bg-gradient-to-br from-[#0E1F42] to-[#1a2d5f] rounded-full flex items-center justify-center shadow-lg transition-all duration-400 hover:scale-110 hover:rotate-3">
                <i className="fas fa-user-check text-3xl text-white"></i>
              </div>
              
              <div className="trust-text">
                <h3 className="text-2xl font-semibold text-[#0E1F42] mb-4">
                  Property Verification Process
                </h3>
                <p className="text-[#6c757d] leading-relaxed mb-6 text-lg">
                  Every property undergoes a rigorous 5-step verification process to ensure quality, safety, and accurate representation.
                </p>
                
                <div className="verification-steps grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    { number: '1', label: 'Physical Inspection' },
                    { number: '2', label: 'Document Verification' },
                    { number: '3', label: 'Quality Assessment' },
                    { number: '4', label: 'Safety Check & Payment' },
                    { number: '5', label: 'Final Approval' }
                  ].map((step, index) => (
                    <div 
                      key={index}
                      className="verification-step bg-white p-4 rounded-lg shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                    >
                      <div className="step-number w-10 h-10 bg-[#9F7539] text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                        {step.number}
                      </div>
                      <span className="text-[#6c757d] text-sm font-medium">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trust Stats */}
          <div className="trust-stats grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              { number: '100%', label: 'Payment Protection' },
              { number: '100%', label: 'Verified Listings' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="trust-stat bg-white p-8 rounded-2xl text-center shadow-lg border-2 border-transparent transition-all duration-400 hover:border-[#9F7539] hover:-translate-y-3 hover:shadow-2xl"
              >
                <div className="stat-number text-5xl font-black text-[#9F7539] mb-4">
                  {stat.number}
                </div>
                <div className="stat-label text-xl font-semibold text-[#0E1F42]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust CTA */}
        <div className="trust-cta bg-gradient-to-br from-[#0E1F42] to-[#1a2d5f] text-white p-10 rounded-3xl text-center relative overflow-hidden">
          <div className="trust-badge inline-flex items-center gap-4 bg-[#0E1F42] bg-opacity-30 px-6 py-4 rounded-full mb-6 font-semibold text-lg backdrop-blur-sm animate-float">
    <i className="fas fa-award text-[#9F7539] text-xl"></i>
    <span>Smart, Secure, and Simplified Property Management</span>
</div>
          <p className="text-white text-opacity-90 text-lg">
            Join thousands of Nigerians who trust DomiHive for secure, professional property rental
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurSecurity;