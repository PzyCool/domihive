import React, { useState, useRef, useEffect } from 'react';
import { IMAGES } from '../utils/constants';

const Step2OTPVerification = ({ 
  formData, 
  errors, 
  loading, 
  handleChange,
  handleBack,
  onSubmit 
}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (formData.otp && formData.otp.length === 4) {
      setOtp(formData.otp.split(''));
    }
  }, [formData.otp]);

  useEffect(() => {
    const otpString = otp.join('');
    if (otpString.length === 4) {
      handleChange('otp', otpString);
    }
  }, [otp, handleChange]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }

    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const digits = text.replace(/\D/g, '').split('').slice(0, 4);
        const newOtp = [...otp];
        digits.forEach((digit, idx) => {
          if (idx < 4) newOtp[idx] = digit;
        });
        setOtp(newOtp);
        
        const lastFilledIndex = digits.length - 1;
        if (lastFilledIndex < 3) {
          inputRefs.current[lastFilledIndex + 1]?.focus();
        } else {
          inputRefs.current[3]?.focus();
        }
      });
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').split('').slice(0, 4);
    
    const newOtp = [...otp];
    digits.forEach((digit, idx) => {
      if (idx < 4) newOtp[idx] = digit;
    });
    setOtp(newOtp);
    
    const lastFilledIndex = digits.length - 1;
    if (lastFilledIndex < 3) {
      inputRefs.current[lastFilledIndex + 1]?.focus();
    } else {
      inputRefs.current[3]?.focus();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSubmit) onSubmit(e);
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
            Verify Your Phone
          </h2>
        </div>
        <p className="text-gray-600">
          We've sent a 4-digit OTP to{" "}
          <span className="font-semibold">
            {formData.countryCode} {formData.phone}
          </span>
        </p>
      </div>

      {/* OTP Input Boxes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Enter the 4-digit code
        </label>
        <div className="flex justify-center gap-3">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={otp[index]}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`w-16 h-16 text-center text-2xl font-bold border-2 rounded-lg focus:ring-2 focus:ring-[#9F7539] focus:border-transparent transition-colors ${
                errors.otp ? 'border-red-500' : 'border-gray-300'
              } ${otp[index] ? 'border-[#9F7539] bg-[#9F7539]/5' : ''}`}
            />
          ))}
        </div>
        {errors.otp && (
          <p className="mt-2 text-sm text-red-600 text-center">{errors.otp}</p>
        )}
        <p className="mt-3 text-sm text-gray-500 text-center">
          Enter the 4-digit code sent to your phone
        </p>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <button
          type="submit"
          disabled={loading || otp.join('').length !== 4}
          className="w-full bg-[#9F7539] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#b58a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        
        {handleBack && (
          <button
            type="button"
            onClick={handleBack}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Back to Edit Details
          </button>
        )}
      </div>

      {/* Resend OTP */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            // Handle resend OTP logic here
          }}
          className="text-sm text-[#9F7539] hover:underline"
        >
          Resend OTP
        </button>
      </div>
    </form>
  );
};

export default Step2OTPVerification;