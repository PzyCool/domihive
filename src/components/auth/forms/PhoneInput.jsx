// src/components/auth/forms/PhoneInput.jsx
import React, { useState, useEffect } from 'react';
// import { countryCodes } from '../utils/constants';

const PhoneInput = ({ 
  value = '', 
  countryCode = '+234', 
  onChange, 
  error = '',
  placeholder = '801 234 5678'
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCode);
  const [phoneNumber, setPhoneNumber] = useState(value);
  
  const countryCodes = [
    { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
    { code: '+233', country: 'Ghana', flag: '🇬🇭' },
    { code: '+254', country: 'Kenya', flag: '🇰🇪' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
  ];

  useEffect(() => {
    setSelectedCountryCode(countryCode);
  }, [countryCode]);

  useEffect(() => {
    setPhoneNumber(value);
  }, [value]);

  const handleCountryCodeChange = (e) => {
    const newCountryCode = e.target.value;
    setSelectedCountryCode(newCountryCode);
    onChange(phoneNumber, newCountryCode);
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setPhoneNumber(newPhone);
    onChange(newPhone, selectedCountryCode);
  };

  const detectCountryFromInput = (phone) => {
    // Remove any non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check for Nigerian number patterns
    if (cleanPhone.startsWith('234') || cleanPhone.startsWith('0')) {
      return '+234';
    }
    // Check for Ghanaian number patterns
    if (cleanPhone.startsWith('233')) {
      return '+233';
    }
    // Check for Kenyan number patterns
    if (cleanPhone.startsWith('254')) {
      return '+254';
    }
    
    // Default to selected country code
    return selectedCountryCode;
  };

  const handlePhoneInput = (e) => {
    let input = e.target.value;
    
    // Auto-format based on country code
    if (selectedCountryCode === '+234') {
      // Nigerian format: 0801 234 5678
      input = input.replace(/\D/g, '');
      if (input.length > 0) {
        if (input.startsWith('0')) {
          input = input.substring(1);
        }
        if (input.length > 3) {
          input = input.substring(0, 3) + ' ' + input.substring(3);
        }
        if (input.length > 7) {
          input = input.substring(0, 7) + ' ' + input.substring(7, 11);
        }
      }
    } else if (selectedCountryCode === '+1') {
      // US/Canada format: (123) 456-7890
      input = input.replace(/\D/g, '');
      if (input.length > 0) {
        input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + '-' + input.substring(6, 10);
      }
    }
    
    setPhoneNumber(input.replace(/\D/g, ''));
    onChange(input.replace(/\D/g, ''), selectedCountryCode);
    
    // Auto-detect country if user types country code
    if (input.replace(/\D/g, '').length >= 3) {
      const detectedCountry = detectCountryFromInput(input.replace(/\D/g, ''));
      if (detectedCountry !== selectedCountryCode) {
        setSelectedCountryCode(detectedCountry);
      }
    }
  };

  const formatPlaceholder = () => {
    if (selectedCountryCode === '+234') return '801 234 5678';
    if (selectedCountryCode === '+1') return '(123) 456-7890';
    if (selectedCountryCode === '+44') return '7911 123456';
    return 'Phone number';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Phone Number
      </label>
      <div className="flex gap-2">
        <div className="w-32">
          <select
            value={selectedCountryCode}
            onChange={handleCountryCodeChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9F7539] focus:border-transparent bg-white"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.code}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneInput}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#9F7539] focus:border-transparent transition-colors ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={formatPlaceholder()}
          />
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      <p className="mt-1 text-xs text-gray-500">
        Country will auto-detect from your number
      </p>
    </div>
  );
};

export default PhoneInput;