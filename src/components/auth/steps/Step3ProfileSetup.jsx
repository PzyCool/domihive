// src/components/auth/steps/Step3ProfileSetup.jsx
import React, { useState } from 'react';
import ProfilePhotoUpload from '../forms/ProfilePhotoUpload';
import { IMAGES } from '../utils/constants';

const Step3ProfileSetup = ({ 
  formData, 
  errors, 
  loading, 
  handleChange,
  setFormData,
  handleBack,
  handleSkip,
  goToLogin,
  onSubmit 
}) => {
  const [profileImage, setProfileImage] = useState(formData.profilePhoto);
  const [imageError, setImageError] = useState('');

  const handleNicknameChange = (e) => {
    handleChange('username', e.target.value);
  };

  const handleImageChange = (file, error) => {
    setProfileImage(file);
    setImageError(error || '');
    
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        profilePhoto: null
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSubmit) onSubmit(e);
  };

  const handleSkipClick = (e) => {
    e.preventDefault();
    if (handleSkip) handleSkip(e);
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    if (handleBack) handleBack();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={IMAGES.icon}
            alt="DomiHive Icon"
            className="h-10 w-10"
          />
          <h2 className="text-2xl font-bold text-gray-900">
            Complete Your Profile
          </h2>
        </div>
        <p className="text-gray-600">
          Add a nickname and profile photo to personalize your account (optional)
        </p>
      </div>

      {/* Nickname Input */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nickname (Optional)
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username || ''}
          onChange={handleNicknameChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9F7539] focus:border-transparent transition-colors ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Choose a nickname (e.g., JohnD)"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          This will be displayed to other users. You can change it later.
        </p>
      </div>

      {/* Profile Photo Upload */}
      <div>
        <p className="block text-sm font-medium text-gray-700 mb-4 text-center">
          Profile Photo (Optional)
        </p>
        <ProfilePhotoUpload
          image={profileImage}
          onImageChange={handleImageChange}
          error={imageError}
        />
      </div>

      {/* Error display */}
      {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errors.general}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#9F7539] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#b58a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
        
        <button
          type="button"
          onClick={handleSkipClick}
          className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Skip for now
        </button>
        
        <button
          type="button"
          onClick={handleBackClick}
          className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
      </div>

      {/* Login Link */}
      <div className="text-center pt-4 border-t">
        <p className="text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={goToLogin}
            className="text-[#9F7539] font-medium hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </form>
  );
};

export default Step3ProfileSetup;