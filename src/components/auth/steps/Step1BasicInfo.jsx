// src/components/auth/steps/Step1BasicInfo.jsx
import React from 'react';
import PhoneInput from '../forms/PhoneInput';
import PasswordInput from '../forms/PasswordInput';
import SocialButtons from '../forms/SocialButtons';
import { IMAGES } from '../utils/constants';

const Step1BasicInfo = ({ 
  formData, 
  errors, 
  loading, 
  handleChange, 
  goToLogin,
  onSubmit 
}) => {
  const handleLocalChange = (e) => {
    const { name, value, type, checked } = e.target;
    handleChange(name, type === 'checkbox' ? checked : value);
  };

  const handlePhoneChange = (phone, countryCode) => {
    handleChange('phone', phone);
    handleChange('countryCode', countryCode);
  };

  const handlePasswordChange = (value) => {
    handleChange('password', value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSubmit) onSubmit(e);
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={IMAGES.icon}
            alt="DomiHive Icon"
            className="h-10 w-10"
          />
          <h2 className="text-2xl font-bold text-gray-900">
            Create Your Account
          </h2>
        </div>
        <p className="text-gray-600">
          Join DomiHive and start your property journey
        </p>
      </div>

      {errors.general && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errors.general}</p>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleLocalChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9F7539] focus:border-transparent transition-colors ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Please enter your real birth name full"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Phone Number Component */}
        <PhoneInput
          value={formData.phone}
          countryCode={formData.countryCode}
          onChange={handlePhoneChange}
          error={errors.phone}
        />

        {/* Password Component */}
        <PasswordInput
          value={formData.password}
          onChange={handlePasswordChange}
          error={errors.password}
          showStrength={true}
        />

        {/* Terms Agreement */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleLocalChange}
            className="mt-1 h-4 w-4 text-[#9F7539] rounded focus:ring-[#9F7539] border-gray-300"
          />
          <label htmlFor="agreeTerms" className="text-sm text-gray-700">
            I agree to the{" "}
            <a
              href="#"
              className="text-[#9F7539] hover:underline font-medium"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-[#9F7539] hover:underline font-medium"
            >
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.agreeTerms && (
          <p className="text-sm text-red-600">{errors.agreeTerms}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#9F7539] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#b58a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
        >
          {loading ? "Sending OTP..." : "Continue with OTP Verification"}
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social Login Buttons Component */}
        <SocialButtons />

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
    </>
  );
};

export default Step1BasicInfo;