// src/components/auth/forms/AuthLayout.jsx
import React from 'react';
import { IMAGES, SIGNUP_FEATURES } from '../utils/constants';

const AuthLayout = ({ children, title = "Find Your Perfect Property", description = "Join thousands of users finding their dream homes with DomiHive's verified properties and professional management.", features = SIGNUP_FEATURES }) => {
  return (
    <div className="h-screen overflow-hidden flex bg-gray-50 no-scrollbar">
      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0E1F42] to-[#1a2d5f] p-12">
        <div className="flex flex-col justify-between h-full w-full">
          <div>
            <div className="mb-12">
              <img 
                src={IMAGES.logo}
                alt="DomiHive Logo" 
                className="h-10"
              />
            </div>
            
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-white mb-6">
                {title}
              </h1>
              <p className="text-xl text-gray-300 mb-10">
                {description}
              </p>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#9F7539] flex items-center justify-center">
                      <i className={`${feature.icon} text-white text-lg`}></i>
                    </div>
                    <span className="text-lg text-white font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      {children}
    </div>
  );
};

export default AuthLayout;