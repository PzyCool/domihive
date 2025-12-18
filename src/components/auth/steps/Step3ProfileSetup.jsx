// src/components/auth/steps/Step3ProfileSetup.jsx
import React, { useState, useCallback, useRef } from 'react';
import EasyCrop from 'react-easy-crop';
// import ProfilePhotoUpload from '../forms/ProfilePhotoUpload';

const Step3ProfileSetup = ({ 
  formData, 
  errors, 
  loading, 
  handleChange,
  setFormData,
  imagePreview,
  setImagePreview,
  goToLogin
}) => {
  const [nickname, setNickname] = useState(formData.username || '');
  const fileInputRef = useRef(null);

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);
    handleChange('username', value);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      handleChange('profilePhotoError', 'File size must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      handleChange('profilePhotoError', 'Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      // For now, just set the file directly
      // In ProfilePhotoUpload component, we'll implement cropping
      setFormData(prev => ({ ...prev, profilePhoto: file }));
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeProfilePhoto = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, profilePhoto: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 bg-[#9F7539] rounded-lg flex items-center justify-center">
            <i className="fas fa-user-circle text-white text-lg"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Complete Your Profile
          </h2>
        </div>
        <p className="text-gray-600">
          Add a nickname and profile photo to personalize your account (optional)
        </p>
      </div>

      <div className="space-y-6">
        {/* Nickname */}
        <div>
          <label
            htmlFor="nickname"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nickname (Optional)
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={nickname}
            onChange={handleNicknameChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9F7539] focus:border-transparent transition-colors ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Choose a nickname (optional)"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            This will be your display name. You can change it later.
          </p>
        </div>

        {/* Profile Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Profile Photo (Optional)
          </label>
          
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="fas fa-user text-5xl text-gray-400"></i>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 flex gap-2">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="w-10 h-10 bg-[#9F7539] rounded-full flex items-center justify-center hover:bg-[#b58a4a] transition-colors shadow-md"
                >
                  <i className="fas fa-upload text-white text-sm"></i>
                </button>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={removeProfilePhoto}
                    className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                  >
                    <i className="fas fa-trash text-white text-sm"></i>
                  </button>
                )}
              </div>
            </div>
            
            <input
              type="file"
              id="profileUpload"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={triggerFileInput}
                className="text-[#9F7539] hover:underline font-medium"
              >
                {imagePreview ? "Change profile photo" : "Upload profile photo"}
              </button>
              <p className="text-sm text-gray-500 mt-1">
                JPG, PNG or GIF (max. 5MB)
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Optional - you can skip and add later
              </p>
            </div>
          </div>

          {errors.profilePhoto && (
            <p className="mt-2 text-sm text-red-600 text-center">
              {errors.profilePhoto}
            </p>
          )}
        </div>

        {/* Buttons */}
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
            onClick={() => {
              handleChange('step', 2); // Go back to step 2
            }}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Back
          </button>
        </div>

        {/* Skip for now */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              // Skip profile setup and create account
              handleChange('username', nickname || '');
              // Trigger form submission
              // This would need to be handled by parent component
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Skip for now, I'll add details later
          </button>
        </div>
      </div>
    </>
  );
};

export default Step3ProfileSetup;