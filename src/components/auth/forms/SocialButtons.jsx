// src/components/auth/forms/SocialButtons.jsx
import React from 'react';

const SocialButtons = () => {
  const handleGoogleLogin = () => {
    // Will implement Google OAuth later
    console.log('Google login clicked');
    // Redirect to Google OAuth URL when backend ready
  };

  const handleAppleLogin = () => {
    // Will implement Apple Sign In later
    console.log('Apple login clicked');
    // Redirect to Apple OAuth URL when backend ready
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
      >
        <i className="fab fa-google text-red-500"></i>
        <span>Google</span>
      </button>
      
      <button
        type="button"
        onClick={handleAppleLogin}
        className="w-full py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
      >
        <i className="fab fa-apple text-gray-900"></i>
        <span>Apple</span>
      </button>
    </div>
  );
};

export default SocialButtons;