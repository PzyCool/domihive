// src/components/auth/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import AuthLayout from '../forms/AuthLayout';
import PhoneInput from '../forms/PhoneInput';
import PasswordInput from '../forms/PasswordInput';
import SocialButtons from '../forms/SocialButtons';
import { IMAGES, LOGIN_FEATURES } from '../utils/constants';
// import { showNotification } from '../utils/notifications';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [countryCode, setCountryCode] = useState('+234');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const rememberedPhone = localStorage.getItem('domihive_remembered_phone');
    if (rememberedPhone) {
      try {
        const phoneData = JSON.parse(rememberedPhone);
        setFormData(prev => ({
          ...prev,
          phone: phoneData.number,
          rememberMe: true
        }));
        setCountryCode(phoneData.countryCode);
      } catch (error) {
        console.error('Error loading remembered phone:', error);
      }
    }
  }, []);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhoneChange = (phone, countryCode) => {
    handleChange('phone', phone);
    setCountryCode(countryCode);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    
    try {
      if (formData.rememberMe) {
        localStorage.setItem('domihive_remembered_phone', JSON.stringify({
          number: formData.phone,
          countryCode: countryCode
        }));
      } else {
        localStorage.removeItem('domihive_remembered_phone');
      }
      
      const fullPhone = countryCode + formData.phone.replace(/\D/g, '');
      
      const result = await login(fullPhone, formData.password);
      
      if (result.success) {
        // showNotification('Login successful!', 'success');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setErrors({ general: result.error || 'Login failed. Please check your credentials.' });
      }
      
    } catch (error) {
      setErrors({ general: 'Login failed. Please check your credentials.' });
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  const handleForgotPassword = () => {
    if (!formData.phone.trim()) {
      setErrors({ phone: 'Please enter your phone number to reset password' });
      return;
    }
    
    // showNotification('Password reset link sent to your phone', 'success');
  };

  return (
    <AuthLayout 
      title="Welcome Back"
      description="Sign in to continue your property journey with DomiHive's verified properties and professional management."
      features={LOGIN_FEATURES}
    >
      <div className="w-full lg:w-1/2 flex flex-col overflow-hidden">
        <div className="pt-8 px-4 lg:px-8 flex justify-end">
          <button
            onClick={goToSignup}
            className="px-4 py-2 text-sm font-medium text-[#0E1F42] hover:text-[#1a2d5f] transition-colors"
          >
            Don't have an account? <span className="font-semibold">Sign Up</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 lg:px-8 pb-8 no-scrollbar">
          <div className="max-w-md mx-auto pt-8 lg:pt-16">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={IMAGES.icon}
                  alt="DomiHive Icon"
                  className="h-10 w-10"
                />
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              </div>
              <p className="text-gray-600">Sign in to your DomiHive account</p>
            </div>

            {errors.general && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Phone Number */}
              <PhoneInput
                value={formData.phone}
                countryCode={countryCode}
                onChange={handlePhoneChange}
                error={errors.phone}
              />

              {/* Password with Forgot Password link */}
              <PasswordInput
                value={formData.password}
                onChange={(value) => handleChange('password', value)}
                error={errors.password}
                showStrength={false}
                showForgotPassword={true}
                onForgotPassword={handleForgotPassword}
              />

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(e) => handleChange('rememberMe', e.target.checked)}
                  className="h-4 w-4 text-[#9F7539] rounded focus:ring-[#9F7539] border-gray-300"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#9F7539] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#b58a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Signing In...</span>
                  </div>
                ) : 'Sign In'}
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

              {/* Social Login Buttons */}
              <SocialButtons />

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center">
                By signing in, you agree to our{' '}
                <a href="#" className="text-[#9F7539] hover:underline font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#9F7539] hover:underline font-medium">
                  Privacy Policy
                </a>
              </p>

              {/* Signup Link */}
              <div className="text-center pt-4 border-t">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={goToSignup}
                    className="text-[#9F7539] font-medium hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;